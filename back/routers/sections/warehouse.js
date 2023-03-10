const { sendRequest } = require("../../utils/db-config")
const warehousesModel = require('../../models').warehouses;
const HSC = require('http-status-codes');
const { verifyToken } = require("../../utils/auth-util");

module.exports = {
  async createWarehouse(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);

    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);;
    }

    const { name, location } = req.body;
    const ownerId = verify.id;
    const result = await warehousesModel.create({
      name,
      location,
      ownerId
    });

    if (result) {
      return res.sendStatus(HSC.OK)
    }

    return res.json(result);
  },

  async getWarehousesByUserID(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);

    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);;
    }

    const ownerId = verify.id;
    const result = await warehousesModel.findAndCountAll({
      where : {
        ownerId,
      },
    });

    return res.json(result);
  },

  async getWarehouseByID(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);

    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);;
    }

    const { warehouseId } = req.params;
    const ownerId = verify.id;
    const result = await warehousesModel.findOne({
      where : {
        id: warehouseId,
        ownerId,
      },
    });

    return res.json(result);
  },

  async updateWarehouseByID(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);

    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);
    }

    const { name, location } = req.body;
    const { warehouseId } = req.params;
    const ownerId = verify.id;
    const result = await warehousesModel.update(
    {
      name,
      location,
    },
    {
      where : {
        id: warehouseId,
        ownerId,
      },
    }
    );

    if (result[0] === 1){
      return res.sendStatus(HSC.OK);
    }

    return res.status(HSC.BAD_REQUEST).send(`Update issue.`);
  },

  async deleteWarehouseByID(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);

    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);
    }

    const { warehouseId } = req.params;
    const ownerId = verify.id;
    const result = await warehousesModel.destroy(
    {
      where : {
        id: warehouseId,
        ownerId,
      },
    }
    );

    if (result === 1){
      return res.sendStatus(HSC.OK);
    }

    return res.status(HSC.BAD_REQUEST).send(`Delete issue.`);
  }
}
