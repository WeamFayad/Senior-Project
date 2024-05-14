const Product = require("../models/product.model");
const path = require("path");

//function to add a product
const addProduct = async (req, res) => {
  let {
    barcode,
    name,
    price,
    category = "OTHERS",
    description,
    details,
    stock,
    image = "default_product_image.png",
  } = req.body;
  //Params validation
  if (!barcode || !name || !price || !description || !details || !stock) {
    return res.status(400).send({ message: "all fileds are required" });
  }
  try {
    //Existing product validation
    const existingProduct = await Product.findOne({ barcode });
    if (existingProduct !== null) {
      return res
        .status(409)
        .send({ message: "product barcode already exists" });
    }
    //details validation
    if (details.length < 5 || description.length < 5) {
      return res.status(400).send({ message: "not enough information given" });
    }
    //number validation
    if (stock < 0 || price < 0) {
      return res.status(400).send({ message: "numbers cannot be negative" });
    }

    //product name
    const trimmedName = name.trim();
    const nameParts = trimmedName.split(" ");
    const capitalizedNames = nameParts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    );
    name = capitalizedNames.join(" ");

    //category
    const validCategories = [
      "DOG SUPPLIES",
      "CAT SUPPLIES",
      "BIRD SUPPLIES",
      "FISH SUPPLIES",
      "SMALL ANIMAL SUPPLIES",
      "ACCESSORIES",
      "OTHERS",
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).send({ message: "category does not exist" });
    }

    //image
    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${barcode}${Date.now()}${imageExtension}`;

      const imageDir = path.join(
        __dirname,
        "../public/images/products",
        imageName
      );
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });

      image = imageName;
    }
    const product = new Product({
      barcode,
      name,
      price,
      category,
      description,
      details,
      stock,
      image,
    });

    await product.save();
    return res.status(200).send({ product, status: "success" });
  } catch (error) {
    // Catch and handle the MongoDB duplicate key error
    if (error.code === 11000) {
      return res
        .status(409)
        .send({ message: "Product barcode already exists" });
    } else {
      return res.status(500).send({ message: error.message });
    }
  }
};

//Function to edit an existing product
const editProduct = async (req, res) => {
  let { barcode, name, price, category, description, details, stock, image } =
    req.body;
  let updatedValues = {};
  try {
    //Existing product validation
    const product = await Product.findOne({ barcode });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    //Name validation
    if (name) {
      const trimmedName = name.trim();
      const nameParts = trimmedName.split(" ");
      const capitalizedNames = nameParts.map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1)
      );
      name = capitalizedNames.join(" ");
      updatedValues.name = name;
    }
    //Price validation
    if (price) {
      if (price < 0) {
        return res.status(400).send({ message: "price cannot be negative" });
      }
      updatedValues.price = price;
    }
    //Category validation
    if (category) {
      const validCategories = [
        "DOG SUPPLIES",
        "CAT SUPPLIES",
        "BIRD SUPPLIES",
        "FISH SUPPLIES",
        "SMALL ANIMAL SUPPLIES",
        "ACCESSORIES",
        "OTHERS",
      ];
      if (!validCategories.includes(category)) {
        return res.status(400).send({ message: "category does not exist" });
      }
      updatedValues.category = category;
    }
    //Desciption validation
    if (description) {
      if (description.length < 5) {
        return res
          .status(400)
          .send({ message: "not enough information given" });
      }
      updatedValues.description = description;
    }
    //Details validation
    if (details) {
      if (details.length < 5) {
        return res
          .status(400)
          .send({ message: "not enough information given" });
      }
      updatedValues.details = details;
    }
    //Stock validation
    if (stock) {
      if (stock < 0) {
        return res.status(400).send({ message: "numbers cannot be negative" });
      }
      updatedValues.stock = stock;
    }
    //Image
    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${barcode}-${Date.now()}${imageExtension}`;

      const imageDir = path.join(
        __dirname,
        "../public/images/products",
        imageName
      );
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });
      updatedValues.image = imageName;
    }

    await Product.findByIdAndUpdate(product._id, updatedValues);
    const updatedProduct = await Product.findById(product._id);
    return res
      .status(200)
      .send({ message: "product updated", product: updatedProduct });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Functio to get all products
const getAllproducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products: products });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to get a specific product by barcode
const getProduct = async (req, res) => {
  try {
    const barcode = req.params.barcode;
    const product = await Product.findOne({ barcode: barcode });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).json({ product: product });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to delete a product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "product not found" });
  }
};

//Function to filter products by category or price or name
const filterProducts = async (req, res) => {
  let { filter, value } = req.body;
  //filter by category
  if (filter == "category") {
    const validCategories = [
      "DOG SUPPLIES",
      "CAT SUPPLIES",
      "BIRD SUPPLIES",
      "FISH SUPPLIES",
      "SMALL ANIMAL SUPPLIES",
      "ACCESSORIES",
      "OTHERS",
    ];
    if (!validCategories.includes(value)) {
      return res.status(400).send({ message: "category does not exist" });
    }
    try {
      const filteredProducts = [];
      const products = await Product.find();
      products.map((product) => {
        if (product.category == value) filteredProducts.push(product);
      });
      if (filteredProducts.length == 0) {
        return res.status(204).send({ message: "no products found" });
      }
      return res.status(200).send({ filteredProducts: filteredProducts });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  //filter by price
  if (filter == "price") {
    if (value < 0) {
      return res.status(400).send({ message: "price cannot be negative" });
    }
    try {
      const filteredProducts = [];
      const products = await Product.find();
      products.map((product) => {
        if (product.price < value) filteredProducts.push(product);
      });
      if (filteredProducts.length == 0) {
        return res.status(204).send({ message: "no products found" });
      }
      return res.status(200).send({ filteredProducts: filteredProducts });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  //filter by name
  if (filter == "name") {
    if (value.length > 20) {
      return res.status(400).send({ message: "name does not exist" });
    }
    try {
      const filteredProducts = [];
      const products = await Product.find();
      products.map((product) => {
        const trimmedName = value.trim();
        const nameParts = trimmedName.split(" ");
        const capitalizedNames = nameParts.map(
          (part) => part.charAt(0).toUpperCase() + part.slice(1)
        );
        value = capitalizedNames.join(" ");
        if (product.name == value) filteredProducts.push(product);
      });
      if (filteredProducts.length == 0) {
        return res.status(204).send({ message: "no products found" });
      }
      return res.status(200).send({ filteredProducts: filteredProducts });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  return res.status(404).send({ message: "filter not found" });
};

//Function to get product stats
const productStats = async (req, res) => {
  try {
    const products = await Product.find();

    const stats = {
      totalNumberOfProducts: products.length,
      numberOfProductsByCategory: {},
      averagePrice: 0,
    };
    let totalSum = 0;

    products.forEach((product) => {
      totalSum += product.price;

      if (stats.numberOfProductsByCategory[product.category]) {
        stats.numberOfProductsByCategory[product.category]++;
      } else {
        stats.numberOfProductsByCategory[product.category] = 1;
      }
    });
    if (products.length > 0) {
      stats.averagePrice = totalSum / products.length;
    }

    return res.status(200).json(stats);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addProduct,
  editProduct,
  getAllproducts,
  getProduct,
  deleteProduct,
  filterProducts,
  productStats,
};
