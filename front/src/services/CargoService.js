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

export const getCargosByWarehouseId = async (warehouseId) => {
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

export const getCargosById = async (warehouseId, entityId) => {
  const { token } = getLoginData();
  try {
    const response = await axios.get(
      `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/${warehouseId}/cargos/${entityId}`,
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

export const updateCargoById = async (
  name,
  quantity,
  imageUrl,
  notes,
  warehouseId,
  entityId
) => {
  const { token } = getLoginData();
  try {
    const response = await axios.put(
      `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/${warehouseId}/cargos/${entityId}/update`,
      {
        name,
        quantity,
        notes,
        imageUrl,
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
