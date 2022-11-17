import axios from "axios";
import { getLoginData } from "../utils/LocalStorageUtil";

export const createWarehouse = async (warehouseName, warehouseLocation) => {
  const { token } = getLoginData();
  const response = await axios.post(
    `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/create`,
    {
      name: warehouseName,
      location: warehouseLocation,
    },
    {
      headers: {
        token,
      },
    }
  );
  return response;
};

export const getWarehousesById = async () => {
  const { token } = getLoginData();
  const response = await axios.get(
    `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/`,
    {
      headers: {
        token,
      },
    }
  );
  return response;
};

export const getWar1ehousesById = () => {
  console.log("change password function called");
};
