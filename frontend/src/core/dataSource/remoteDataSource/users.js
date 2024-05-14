import { sendRequest } from "../../helpers/request";

export const userDataSource = {
  getCart: async () => {
    const response = await sendRequest({
      route: "/user/",
      method: "GET",
    });

    return response;
  },
  addToCart: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/user/",
      method: "POST",
    });

    return response;
  },
  updateCart: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/user/editCart",
      method: "PUT",
    });

    return response;
  },
  updateUser: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "/user/",
      method: "PUT",
    });

    return response;
  },
};
