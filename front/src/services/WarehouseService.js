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

export const getWarehousesByUserId = async () => {
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

export const getWarehouseById = async (warehouseId) => {
  const { token } = getLoginData();
  const response = await axios.get(
    `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/${warehouseId}`,
    {
      headers: {
        token,
      },
    }
  );
  return response;
};

export const updateWarehouseById = async (
  warehouseId,
  warehouseName,
  warehouseLocation
) => {
  const { token } = getLoginData();
  const response = await axios.put(
    `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/${warehouseId}/update`,
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
