let Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	',
      dialect: 'mysql',
      port: 3306,
      user: 'lwswh2zdjixfbl6z',
      password: 'atgfu1uu67lfd6ye',
      database: 'q9r70zp2dfzl55q9'
    }
  );
}
//hellohello heehhlloooo
//hello hiiiii
module.exports = sequelize;