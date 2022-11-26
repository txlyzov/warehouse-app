import axios from "axios";
import { getLoginData, removeLoginData } from "../utils/LocalStorageUtil";

export const createCargo = async (
  name,
  quantity,
  imageUrl,
  notes,
  warehouseId
) => {
  const { token } = getLoginData();
  try {
    const response = await axios.post(
      `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/${warehouseId}/cargos/create`,
      {
        name,
        quantity,
        imageUrl,
        notes,
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

export const getCargosBywarehouseId = async (warehouseId) => {
  const { token } = getLoginData();
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/${warehouseId}/cargos`,
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
