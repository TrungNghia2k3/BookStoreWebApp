import axios from "axios";
import { CONFIG } from "../configurations/configuration";

export const checkEmailWithNeverBounce = async (email) => {
  try {
    const response = await axios.post(`${CONFIG.API_GATEWAY}/email-validation`, null, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};
