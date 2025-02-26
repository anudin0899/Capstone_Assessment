const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Config/db');  // Assuming you have a Sequelize instance in db.js

const User = sequelize.define('User', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
}, {
  timestamps: true,  
});

module.exports = User;
