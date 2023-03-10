const cargoModel = require('../../models').cargos;
const warehousesModel = require('../../models').warehouses;
const HSC = require('http-status-codes');
const { verifyToken } = require("../../utils/auth-util");

module.exports = {
  async createCargo(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);

    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);;
    }

    const { 
      name,
      quantity,
      imageUrl,
      notes,
    } = req.body;
    const { warehouseId } = req.params;
    const result = await cargoModel.create({
      name,
      quantity,
      imageUrl,
      notes,
      warehouseId,
    });

    if (result) {
      return res.sendStatus(HSC.OK)
    }

    return res.json(result);
  },

  async getCargosByWarehouseID(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);

    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);;
    }

    const { warehouseId } = req.params;
    const userId = verify.id;
    const warehouse = await warehousesModel.findOne({
      where : {
        id: warehouseId,
      },
    });

    if(warehouse.ownerId === userId){
      const result = await cargoModel.findAndCountAll({
        where : {
          warehouseId,
        },
      });

      return res.json(result);
    }

    return res.status(HSC.FORBIDDEN).send(`No access.`);
  },

  async getCargoByID(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);
    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);;
    }
    const { warehouseId, cargoId } = req.params;
    const userId = verify.id;

    const result = await cargoModel.findOne({
      where : {
        id: cargoId,
        warehouseId
      },
    });

    if (!result){
      return res.status(HSC.OK).send(null);
    }

    const cargoWarehouse = await warehousesModel.findOne({
      where : {
        id: result.warehouseId,
      },
    });

    if(cargoWarehouse.ownerId === userId){
      return res.json(result);
    }

    return res.status(HSC.FORBIDDEN).send(`No access.`);
  },

  async updateCargoByID(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);
    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);
    }
    const {  
      name,
      quantity,
      imageUrl,
      notes,
    } = req.body;
    const { warehouseId, cargoId } = req.params;
    const ownerId = verify.id;

    const cargo = await cargoModel.findOne({
      where : {
        id: cargoId,
        warehouseId,
      },
    });
    if (!cargo){
      return res.status(HSC.BAD_REQUEST).send(`Update issue.`);
    }
    const cargoWarehouse = await warehousesModel.findOne({
      where : {
        id: cargo.warehouseId,
      },
    });

    if(cargoWarehouse.ownerId === ownerId){
      const result = await cargoModel.update(
        {
          name,
          quantity,
          imageUrl,
          notes,
        },
        {
          where : {
            id: cargoId,
            warehouseId,
          },
        }
        );
        if (result[0] === 1){
          return res.sendStatus(HSC.OK);
        }
        return res.status(HSC.BAD_REQUEST).send(`Update issue.`);
    }
    return res.status(HSC.FORBIDDEN).send(`No access.`);
  },

  async deleteCargoByID(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);
    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);
    }
    const { warehouseId, cargoId } = req.params;
    const ownerId = verify.id;

    const cargo = await cargoModel.findOne({
      where : {
        id: cargoId,
        warehouseId
      },
    });
    if (!cargo){
      return res.status(HSC.BAD_REQUEST).send(`Delete issue.`);
    }

    const cargoWarehouse = await warehousesModel.findOne({
      where : {
        id: cargo.warehouseId,
      },
    });

    if(cargoWarehouse.ownerId === ownerId){
      const result = await cargoModel.destroy(
        {
          where : {
            id: cargoId,
            warehouseId,
          },
        }
        );
    
        if (result === 1){
          return res.sendStatus(HSC.OK);
        }
        return res.status(HSC.BAD_REQUEST).send(`Delete issue.`);
    }

    return res.status(HSC.FORBIDDEN).send(`No access.`);
  },

  async deleteCargoGroup(req,res) {
    const token = req.get('token');
    const verify = verifyToken(token);
    if (!verify) {
      return res.status(HSC.FORBIDDEN).send(`Wrong token.`);
    }
    const { warehouseId } = req.params;
    const ownerId = verify.id;
    const cargoArray = (req.query.cargoArray).split(',');

    cargoArray.forEach(async (cargoId,index) => {
      const cargo = await cargoModel.findOne({
        where : {
          id: cargoId,
          warehouseId
        },
      });

      if (!cargo){
        return res.status(HSC.BAD_REQUEST).send(`Delete issue.`);
      }
  
      const cargoWarehouse = await warehousesModel.findOne({
        where : {
          id: cargo.warehouseId,
        },
      });
  
      if(cargoWarehouse.ownerId === ownerId){
        const result = await cargoModel.destroy(
          {
            where : {
              id: cargoId,
              warehouseId,
            },
          }
          );
          if(result !== 1){
            return res.status(HSC.BAD_REQUEST).send(`Delete issue.`);
          }

          if (index === cargoArray.length-1){
            return res.sendStatus(HSC.OK);
          }
      }
      else {
        return res.status(HSC.FORBIDDEN).send(`No access.`);
      }
    });
  }
}