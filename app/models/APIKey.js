const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BaseModel = require('./BaseModel');
const User = require('./User');

class User extends BaseModel {}

User.init({
   id: {
      type: DataTypes.INTEGER(10),
      primaryKey: true,
      autoIncrement: true
   },
   dibuat_oleh: {
      type: DataTypes.INTEGER,
      allowNull: false,
   },
   api_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
   },
   status: DataTypes.ENUM('active', 'disable'),
   password: DataTypes.STRING(255),
   created_at: DataTypes.TIME
}, {
   sequelize,
   tableName: 'users'
});

LogAbsensi.belongsTo(User, {
  foreignKey: 'id',
  targetKey: 'id',
  as: 'user'
});


module.exports = User;