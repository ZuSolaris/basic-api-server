'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('download', {
  buyer: {
    type: DataTypes.STRING,
    allowNuLL: false,
  },
  quantity:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  selection: {
    type: DataTypes.STRING,
    values: ['music', 'game', 'utility'],
    allowNull: true,
  },
});
};
