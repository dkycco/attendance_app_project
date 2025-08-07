const {
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/database');
const BaseModel = require('./BaseModel');
const DataSiswa = require('./DataSiswa');

class LogAbsensi extends BaseModel {}

LogAbsensi.init({
  id: {
    type: DataTypes.INTEGER(10),
    primaryKey: true,
    autoIncrement: true
  },
  nisn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status_siswa: DataTypes.ENUM('hadir', 'pulang'),
  status_pesan: DataTypes.ENUM('pending', 'terkirim', 'gagal'),
  pesan: DataTypes.TEXT,
  created_at: DataTypes.DATE
}, {
  sequelize,
  tableName: 'log_absensi'
});

LogAbsensi.belongsTo(DataSiswa, {
  foreignKey: 'nisn',
  targetKey: 'nisn',
  as: 'siswa'
});

module.exports = LogAbsensi;