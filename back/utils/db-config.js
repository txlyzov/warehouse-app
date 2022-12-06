const mysql = require("mysql");
const config = require('../config/sequelize-config.js');

const pattern = process.env.NODE_ENV || ['development'];

const configuration = mysql.createConnection({
    host: config[pattern].host,
    user: config[pattern].username,
    password: config[pattern].password,
    database: config[pattern].database,
  });

module.exports = {
        sendRequest(request) {

        return new Promise((resolve, reject)=>{
            configuration.query(request, (err, result, fields) => {
                if(err){
                    return reject(err);
                }

                resolve(result);
             });
         });
    }
}