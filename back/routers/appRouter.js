// Main server router

const { Router } = require('express');
const { changePassword, signUpUser, signInUser } = require('./sections/auth');
const { getAllByUserID } = require('./sections/warehouse');

const router = Router();

// Define routes to sub-routers
// router.use('/auth', authRouter);
// router.use(authCheck);
// router.use('/user', userRouter);

router.post('/auth/user/create', signUpUser);
router.post('/auth/user/sign-in', signInUser);
router.post('/auth/user/change-password', changePassword);

router.get('/warehouses/', getAllByUserID);

router.get('/warehouses/cargo/:id', getAllByUserID);
// router.use('/warehouses/warehouse/:id', recipeRouter);


module.exports = router;
