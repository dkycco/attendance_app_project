const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const BaseModel = require('./BaseModel');

class DataSiswa extends BaseModel {}

DataSiswa.init({
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true
  },
  id_sidik_jari: DataTypes.INTEGER(10),
  nisn: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true
  },
  nama_lengkap: DataTypes.STRING(100),
  kelas: DataTypes.STRING(10),
  nama_orangtua_wali: DataTypes.STRING(100),
  no_hp: DataTypes.STRING(17),
  created_at: DataTypes.TIME
}, {
  sequelize,
  tableName: 'data_siswa'
});

module.exports = DataSiswa;