const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
   
    static associate(models) {
     
    }
  };
  Members.init({  
     
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
    modelName: 'Members',
    paranoid: true
  });
  return Members;
};