const mysql = require("mysql");

const configuration = mysql.createConnection({
  host: "localhost",
  user: "sqluser",
  password: "password",
  database: "qwerty",
});

function testReq() {
  configuration.query("select x, y from qqq", (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    return console.log(result);
  });
}

module.exports = { testReq };
