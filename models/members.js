
module.exports = function (sequelize, dataTypes) { 

    let alias = "members"
    
    let cols = {
    
       id :{type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true},

       name:{ type: dataTypes.STRING,
        allowNull: false},

       facebookUrl:{type: dataTypes.STRING},

       instagramUrl:{type: dataTypes.STRING},

       image:{type: dataTypes.STRING, 
        allowNull:false},

       desription: {type:dataTypes.STRING} , 

       createdAt:{ type:dataTypes.DATE},

       updatedAt: { type:dataTypes.DATE},

       deletedAt: { type:dataTypes.DATE}
    
    
    }
    
    let config = {tableName: "members",
    timestamps: true}
    
    let members = sequelize.define(alias, cols ,config);
    
    return members
    
    
    
    }