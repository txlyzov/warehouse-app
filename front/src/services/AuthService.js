import axios from "axios";
import { setLoginData } from "../utils/LocalStorageUtil";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_SERVER_URL}/api/auth/user/sign-in`,
      {
        email,
        password,
      }
    );
    setLoginData("loginData", {
      username: response.data.email.substring(
        0,
        response.data.email.indexOf("@")
      ),
      token: response.data.token,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const registerNewUser = async (email, password) => {
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_SERVER_URL}/api/auth/user/create`,
      {
        email,
        password,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const resetUserPassword = async (email) => {
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_SERVER_URL}/api/auth/user/reset-password`,
      {
        email,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const changeUserPassword = (password) => {
  console.log("change password function called");
};
