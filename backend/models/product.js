const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db");

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
  },

  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  thumbnail: {
    type: DataTypes.STRING, // single image path
    allowNull: true,
  },

  images: {
    type: DataTypes.JSON, // multiple image paths
    allowNull: true,
  },
});

module.exports = Product;
