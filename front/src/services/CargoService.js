import axios from "axios";
import { StatusCodes } from "http-status-codes";
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
    if (error.response.status === StatusCodes.FORBIDDEN) {
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
    if (error.response.status === StatusCodes.FORBIDDEN) {
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
    if (error.response.status === StatusCodes.FORBIDDEN) {
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
    if (error.response.status === StatusCodes.FORBIDDEN) {
      removeLoginData();
    }

    return error;
  }
};

export const deleteCargoById = async (warehouseId, entityId) => {
  const { token } = getLoginData();

  try {
    const response = await axios.delete(
      `http://${process.env.REACT_APP_SERVER_URL}/api/warehouses/${warehouseId}/cargos/${entityId}/delete`,
      {
        headers: {
          token,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === StatusCodes.FORBIDDEN) {
      removeLoginData();
    }

    return error;
  }
};

export const deleteCargoGroup = async (warehouseId, entityIdArray) => {
  const { token } = getLoginData();

  try {
    const response = await axios.delete(
      `http://${
        process.env.REACT_APP_SERVER_URL
      }/api/warehouses/${warehouseId}/cargos/delete?&cargoArray=${entityIdArray.toString()}`,
      {
        headers: {
          token,
        },
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === StatusCodes.FORBIDDEN) {
      removeLoginData();
    }

    return error;
  }
};
