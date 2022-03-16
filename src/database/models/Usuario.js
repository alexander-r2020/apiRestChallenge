module.exports = (sequelize,DataTypes) =>{
    let alias = 'Usuario';
    let cols = {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },      
        email:{
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        createdAt:{
            type: DataTypes.DATE
        },
        updatedAt:{
            type: DataTypes.DATE
        },

    }
    let config = {
        timestamps:true,
        createdAt:'createdAt',
        updatedAt:'updatedAt',
        deletedAt:false
    }
    const Usuario = sequelize.define(alias,cols,config)

    /////////////////////////////////////////////////////

    /////////////////////////////////////////////////////

    return Usuario
  
}