// importing dependencies
const axios = require("axios");

export const postApi = async (route, data) => {
  try {
    const response = await axios.post(
      `api/${route}`,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw error.response.data;
  }
};
