'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Commentaries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Commentaries.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      novelty_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Commentaries',
      deletedAt: 'deletedAt',
      paranoid: true,
      timestamps: true,
    }
  );
  return Commentaries;
};
