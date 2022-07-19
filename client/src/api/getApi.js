// importing dependencies
const axios = require("axios");

export const getApi = async (route, params) => {
  try {
    const response = await axios.get(route, {
      headers: {
        "Content-Type": "application/json",
      },
      params: { ...params },
    });

    return response;
  } catch (error) {
    throw error.response.data;
  }
};
