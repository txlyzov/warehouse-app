const database = {
  username: 'root',
  password: '1111',
  database: 'the_crawler',
  host: '127.0.0.1',
  dialect: 'mysql',
};

const connection = {
  host: '127.0.0.1',
  port: '3000',
};

module.exports.development = { database, connection };
