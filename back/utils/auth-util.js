const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME;


module.exports = {
    createToken(data){
        return jwt.sign(data, JWT_SECRET, 
            {
                expiresIn: TOKEN_LIFETIME,
            }
          );
    },
    verifyToken(token){
        try {
            const result = jwt.verify(token, JWT_SECRET);
            return result;
        } catch (error) {
            return null;
        }        
    }
}