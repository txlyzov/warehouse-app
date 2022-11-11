const { Router } = require('express');
const { changePassword, signUpUser, signInUser } = require('./sections/auth');
const { createCargo, getCargosByWarehouseID, getCargoByID, updateCargoByID, deleteCargoByID } = require('./sections/cargo');
const { createWarehouse, getWarehousesByUserID, getWarehouseByID, updateWarehouseByID, deleteWarehouseByID } = require('./sections/warehouse');

const router = Router();

router.post('/auth/user/create', signUpUser);
router.post('/auth/user/sign-in', signInUser);
router.post('/auth/user/change-password', changePassword);

router.post('/warehouses/create', createWarehouse);
router.get('/warehouses/', getWarehousesByUserID);
router.get('/warehouses/:warehouseId', getWarehouseByID);
router.put('/warehouses/:warehouseId/update', updateWarehouseByID);
router.delete('/warehouses/:warehouseId/delete', deleteWarehouseByID);

router.post('/warehouses/:warehouseId/cargos/create', createCargo);
router.get('/warehouses/:warehouseId/cargos', getCargosByWarehouseID);
router.get('/warehouses/:warehouseId/cargos/:cargoId', getCargoByID);
router.put('/warehouses/:warehouseId/cargos/:cargoId/update', updateCargoByID);
router.delete('/warehouses/:warehouseId/cargos/:cargoId/delete', deleteCargoByID);

module.exports = router;
