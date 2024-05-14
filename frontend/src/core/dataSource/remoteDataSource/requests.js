import { sendRequest } from "../../helpers/request";

export const requestsDataSource = {
  requestAdoption: async (data) => {
    const response = await sendRequest({
      body: data,
      route: "requests/",
      method: "POST",
    });

    return response;
  },
};
