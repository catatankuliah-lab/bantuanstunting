const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bapangdelapandelapanlogistics', 'its88log', 'its88log', {
  host: '195.35.7.27',
  dialect: 'mysql',
  logging: console.log,
  dialectOptions: {
    connectTimeout: 60000
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
