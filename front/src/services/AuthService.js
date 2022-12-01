import axios from "axios";
import { getLoginData, setLoginData } from "../utils/LocalStorageUtil";

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
      email: response.data.email,
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

export const changeUserPassword = async (oldPassword, newPassword) => {
  try {
    const { email, token } = getLoginData();
    const responseAuth = await axios.post(
      `http://${process.env.REACT_APP_SERVER_URL}/api/auth/user/sign-in`,
      {
        email,
        password: oldPassword,
      }
    );

    if (!responseAuth.data.token) {
      return responseAuth;
    }

    const responsePassword = await axios.post(
      `http://${process.env.REACT_APP_SERVER_URL}/api/auth/user/change-password`,
      {
        newPassword,
      },
      {
        headers: {
          token,
        },
      }
    );
    return responsePassword;
  } catch (error) {
    return error;
  }
};
