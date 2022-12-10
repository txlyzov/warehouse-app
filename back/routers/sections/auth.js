const usersModel = require('../../models').users;
const HSC = require('http-status-codes');
const { createToken, verifyToken } = require("../../utils/auth-util");

module.exports = {
    async signUpUser(req,res) {
      const { email, password } = req.body;
      const userSearch = await usersModel.findOne({
        where: {
          email,
        },
      });;

      if (userSearch){
        return res.status(HSC.BAD_REQUEST).send(`Account already exists.`);
      }

      usersModel.create({
          email,
          password,
        });

      return res.sendStatus(HSC.OK);
    },

    async signInUser(req,res) {
    const { email, password } = req.body;

    try {
      const userByEmail = await usersModel.findOne({
        where: {
          email,
        },
      });;

    if (!userByEmail) {
      return res.status(HSC.BAD_REQUEST).send(`Wrong email.`);
    }

    if(password===userByEmail.password){
        const token = createToken({ id: userByEmail.id, email })
        return res.status(HSC.OK).json({ token, email });
    }

    return res.status(HSC.BAD_REQUEST).send(`Wrong password.`);
    } catch (error) {
      return res.status(HSC.BAD_REQUEST).send(error);
    }
    },

    async resetPassword(req,res) {

      const { email } = req.body;
      const tempPassword = Math.random().toString(36).slice(-8);
      const result = await usersModel.update(
            {
              password: tempPassword,
            },
            {
              where: {
                email,
              },
            },
          );
      console.log(`New password: ${tempPassword}`);

      return res.sendStatus(HSC.OK);
    },

    async changePassword(req,res) {

      const token = req.get('token');
      const verify = verifyToken(token);

      if (!verify) {
        return res.status(HSC.FORBIDDEN).send(`Wrong token.`);
      }

      const { newPassword: password } = req.body;
      const id = verify.id;
      console.log(id);
      const result = await usersModel.update(
            {
              password,
            },
            {
              where: {
                id,
              },
            },
          );

      return res.sendStatus(HSC.OK);
    }
}