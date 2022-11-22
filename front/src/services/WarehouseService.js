import axios from "axios";
import { getLoginData, removeLoginData } from "../utils/LocalStorageUtil";

export const createWarehouse = async (warehouseName, warehouseLocation) => {
  const { token } = getLoginData();
  try {
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
  } catch (error) {
    if (error.response.status === 403) {
      removeLoginData();
    }
    return error;
  }
};

export const getWarehousesByUserId = async () => {
  const { token } = getLoginData();
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/`,
      {
        headers: {
          token,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response.status === 403) {
      removeLoginData();
    }
    return error;
  }
};

export const getWarehouseById = async (warehouseId) => {
  const { token } = getLoginData();
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/${warehouseId}`,
      {
        headers: {
          token,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 403) {
      removeLoginData();
    }
    return error;
  }
};

export const updateWarehouseById = async (
  warehouseId,
  warehouseName,
  warehouseLocation
) => {
  const { token } = getLoginData();
  try {
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
  } catch (error) {
    if (error.response.status === 403) {
      removeLoginData();
    }
    return error;
  }
};

export const deleteWarehouseById = async (warehouseId) => {
  const { token } = getLoginData();
  try {
    const response = await axios.delete(
      `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/${warehouseId}/delete`,
      {
        headers: {
          token,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response.status === 403) {
      removeLoginData();
    }
    return error;
  }
};
