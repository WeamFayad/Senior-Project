const Order = require("../models/order.model");
const Product = require("../models/product.model");

//Change coupons as needed ( couponName : discount $amount )
const coupons = [{ SUMMER21: 10 }, { WINTER21: 15 }];

//Function to add an order by a user
const addOrder = async (req, res) => {
  try {
    const { items, couponCode } = req.body;
    const userId = req.user._id;
    let discountAmount = 0;
    //Coupon check
    if (couponCode) {
      const coupon = coupons.find((coup) => coup.hasOwnProperty(couponCode));
      if (coupon) {
        discountAmount = coupon[couponCode];
      } else {
        return res.status(404).send({ message: "coupon is not valid" });
      }
    }
    //Total amount calculations
    let totalAmount = items.reduce((sum, item) => sum + item.total, 0);
    totalAmount = Math.max(totalAmount - discountAmount, 0);

    //Date calculations
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() + 2);
    const deliveryDate = orderDate.toISOString().split("T")[0];

    const newOrder = new Order({
      user_id: userId,
      delivery_date: deliveryDate,
      items,
      ...(couponCode && { couponCode }),
      discountAmount,
      totalAmount,
    });

    //Product check, if all products in order are valid
    await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product_id);
        if (!product) {
          throw new Error(`Product with ID ${item.product_id} not found`);
        }
        product.stock = Math.max(0, product.stock - item.quantity);
        await product.save();
      })
    );

    await newOrder.save();
    return res
      .status(201)
      .send({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to change order status by admin
const editOrder = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const validStatuses = ["PENDING", "ACCEPTED", "DELIVERED", "REJECTED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({ message: "Invalid order status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    return res
      .status(200)
      .send({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to get all orders to be displayed to admin
const getAllOrders = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["PENDING", "ACCEPTED", "DELIVERED", "REJECTED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).send({ message: "Invalid order status" });
    }

    const orders = await Order.find({ status }).populate({
      path: "user_id",
      select: "name image",
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .send({ message: "No orders found with the given status" });
    }

    return res
      .status(200)
      .send({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function for a user to check all of his current and previous orders
const getAllOrdersOfUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const orders = await Order.find({ user_id: userId });

    if (orders.length === 0) {
      return res
        .status(404)
        .send({ message: "No orders found for the given user" });
    }

    return res
      .status(200)
      .send({ message: "Orders retrieved successfully", orders });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to get a specific order by id of the order
const getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    return res
      .status(200)
      .send({ message: "Order retrieved successfully", order });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to display order stats for the admin
const orderStats = async (req, res) => {
  try {
    //Setting the date variables to be used with orders
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    //Total of orders calculation
    const sumOrders = (orders) => {
      return orders.reduce((sum, order) => sum + order.totalAmount, 0);
    };

    const orders = await Order.find({
      createdAt: { $gte: firstDayOfMonth },
    });

    const ordersToday = orders.filter((order) => order.createdAt >= today);
    const ordersThisWeek = orders.filter(
      (order) => order.createdAt >= oneWeekAgo
    );
    const ordersThisMonth = orders;

    const stats = {
      totalOrdersToday: ordersToday.length,
      totalOrdersThisWeek: ordersThisWeek.length,
      totalOrdersThisMonth: ordersThisMonth.length,
      totalRevenueToday: sumOrders(ordersToday),
      totalRevenueThisWeek: sumOrders(ordersThisWeek),
      totalRevenueThisMonth: sumOrders(ordersThisMonth),
      averageOrderTotal:
        orders.length > 0 ? sumOrders(orders) / orders.length : 0,
    };

    res
      .status(200)
      .send({ message: "Order stats retrieved successfully", stats });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addOrder,
  editOrder,
  getAllOrders,
  getAllOrdersOfUser,
  getOrder,
  orderStats,
};
