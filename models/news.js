'use strict';
const { Model } = require('sequelize');
// const Commentaries = require('./commentaries');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.hasMany(models.Commentaries, {
        as: 'Commentaries',
        foreignKey: 'novelty_id',
      });
    }
  }

  News.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'News',
      deletedAt: 'deletedAt',
      paranoid: true,
      timestamps: true,
    }
  );
  return News;
};
