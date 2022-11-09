const cargoModel = require('../../models').cargos;
const HSC = require('http-status-codes');
const { verifyToken } = require("../../utils/auth-util");

module.exports = {
  async addCargo(req,res) {
    const { token } = req.body;
    const id = verifyToken(token).id;
    const result = await cargoModel.create({
      where : {
        ownerId: id,
      },
    });

    return res.json(result);
  },

  async getCargoByWarehouseID(req,res) {
    const { token } = req.body;
    const id = verifyToken(token).id;
    const result = await cargoModel.findAndCountAll({
        where : {
          ownerId: id,
        },
    });
    
    return res.json(result);
    }
}