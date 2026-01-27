const { Sequelize } = require("sequelize");
require("dotenv").config();

const isTestEnvironment = process.env.NODE_ENV === 'test';
console.log(`Running in ${isTestEnvironment ? 'TEST' : 'DEVELOPMENT'} mode.`);

const sequelize = new Sequelize(
  isTestEnvironment ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    port: process.env.DB_PORT || 5432,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, connectDB };
