import axios from "axios";

export const checkEmailWithNeverBounce = async (email) => {
  try {
    const response = await axios.post("https://book-store-web-api-5ac5f5640ffb.herokuapp.com/api/email-validation", null, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
