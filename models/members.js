const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class members extends Model {
   
    static associate(models) {
     
    }
  };
  members.init({  
     id:DataTypes.INTEGER,
    name: DataTypes.STRING,
    facebookUrl: DataTypes.STRING,
    instagramUrl: DataTypes.STRING,
    linkedinUrl: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'members',
    paranoid: true
  });
  return members;
};