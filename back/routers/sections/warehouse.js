const { sendRequest } = require("../../utils/db-config")
const warehousesModel = require('../../models').warehouses;
const HSC = require('http-status-codes');
const { verifyToken } = require("../../utils/auth-util");

module.exports = {
  async getAllByUserID(req,res) {
    const { token } = req.body;
    const id = verifyToken(token).id;
    const result = await warehousesModel.findAndCountAll({
      where : {
        ownerId: id,
      },
    });

    return res.json(result);
    }
}
