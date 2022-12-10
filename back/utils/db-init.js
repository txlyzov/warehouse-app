const config = require('../config/sequelize-config.js');
const mysql = require('mysql2');

const pattern = process.env.NODE_ENV || ['development'];
const configuration = mysql.createConnection({
    host: config[pattern].host,
    user: config[pattern].username,
    password: config[pattern].password,
  });

module.exports.createDb = function () {
    if (config[pattern].password) {
    configuration.connect(function(err) {

        if (err) throw err;
        console.log("Connection established");
        configuration.query(`CREATE DATABASE ${config[pattern].database}`, function (err) {

          if (err) throw err;
          console.log("Database created");
          process.exit(1);
        });
    });
    } else console.log('Fill your DB password in config folder.');
};

module.exports.dropDb = function () {
    if (config[pattern].password) {
    configuration.connect(function(err) {

        if (err) throw err;
        console.log("Connection established");
        configuration.query(`DROP DATABASE ${config[pattern].database}`, function (err) {

          if (err) throw err;
          console.log("Database dropped");
          process.exit(1);
        });
        });
    } else console.log('Fill your DB password in config folder.');
};
