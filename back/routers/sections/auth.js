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
    const userByEmail = await usersModel.findOne({
        where: {
          email,
        },
      });;

    if (!userByEmail) {
      return res.status(HSC.BAD_REQUEST).send(`Wrong email.`);
    }

    if(password===userByEmail.password){
        console.log(444);
        const token = createToken({ id: userByEmail.id, email })
        return res.status(HSC.OK).json({ token, email });
    }

    return res.status(HSC.BAD_REQUEST).send(`Wrong password.`);
    },

    async changePassword(req,res) {

      const { newPassword: password,token } = req.body;
      const id = verifyToken(token).id;
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