const mysql = require("mysql");

const configuration = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "the_crawler",
  });

module.exports = {
        sendRequest(request) {

        return new Promise((resolve, reject)=>{
            // const configuration = mysql.createConnection({
            //     host: "localhost",
            //     user: "root",
            //     password: "1111",
            //     database: "the_crawler",
            //   });
            // configuration.connect();
            configuration.query(request, (err, result, fields) => {
                if(err){
                    return reject(err);
                }

                resolve(result);
             });
            //  configuration.end();
         });
    }
}