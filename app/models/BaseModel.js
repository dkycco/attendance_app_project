const { Model } = require('sequelize');

class BaseModel extends Model {
  static init(attributes = {}, options = {}) {
    return super.init(attributes, {
      ...options,
      timestamps: true,
      underscored: true,
    });
  }
}

module.exports = BaseModel;
