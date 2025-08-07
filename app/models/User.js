const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BaseModel = require('./BaseModel');

class User extends BaseModel {}

User.init({
   id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true
   },
   nama_lengkap: DataTypes.STRING(100),
   username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
   },
   role: DataTypes.ENUM('webmaster', 'admin', 'guru'),
   password: DataTypes.STRING(255),
   created_at: DataTypes.TIME
}, {
   sequelize,
   tableName: 'users'
});

module.exports = User;