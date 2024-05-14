import { sendRequest } from "../../helpers/request";

export const productDataSource = {
  getProducts: async () => {
    const response = await sendRequest({
      route: "/products/",
      method: "GET",
    });

    return response;
  },
};
