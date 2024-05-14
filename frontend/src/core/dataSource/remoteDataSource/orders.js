import { sendRequest } from "../../helpers/request";

export const orderDataSource = {
  placeOrder: async (data) => {
    const response = await sendRequest({
      body: data,
      method: "POST",
      route: "/orders/",
    });
    return response;
  },
};