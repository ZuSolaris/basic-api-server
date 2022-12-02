'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const itemSchema = require('./item.schema');
const downloadSchema = require('./download.schema');


// 'postgres://localhost:5432/sql-test'

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite:memory'
  : process.env.DATABASE_URL;
//Instantiate

const sequelizeDb = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

//crustomer model with schema
const ItemModel = itemSchema(sequelizeDb, DataTypes);
const DownloadModel = downloadSchema(sequelizeDb, DataTypes);
module.exports = {
  sequelizeDb,
  ItemModel,
  DownloadModel,
}


