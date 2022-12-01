'use strict';

module.exports = (sequelizeDatabase, DataTypes) => {
  return sequelizeDatabase.define('item', {
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
    values: ['boots', 'skis', 'goggles'],
    allowNull: true,
  },
});
};