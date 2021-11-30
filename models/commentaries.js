"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Commentaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Commentaries.belongsTo(models.News, { as: 'novelty' });
    }
  }
  Commentaries.init(
    {
      user_id: DataTypes.INTEGER,
      novelty_id: DataTypes.INTEGER,
      body: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Comentaries",
      paranoid: true,
    }
  );
  return Commentaries;
};