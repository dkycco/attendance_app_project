const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BaseModel = require('./BaseModel');
const UserModel = require('./User')

class APIKey extends BaseModel {}

APIKey.init({
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
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
   },
   keterangan: DataTypes.STRING(255),
   status: DataTypes.ENUM('active', 'disable'),
   created_at: DataTypes.TIME
}, {
   sequelize,
   tableName: 'api_key'
});

APIKey.belongsTo(UserModel, {
  foreignKey: 'dibuat_oleh',
  targetKey: 'id',
  as: 'users'
});


module.exports = APIKey;