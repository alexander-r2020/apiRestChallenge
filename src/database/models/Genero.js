module.exports = (sequelize,DataTypes) =>{
    let alias = 'Genero';
    let cols = {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },      
        nombre:{
            type:DataTypes.STRING,
            allowNull: false
        },
        imagen:{
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
    const Genero = sequelize.define(alias,cols,config)

    /////////////////////////////////////////////////////
    Genero.associate = function(models){
        Genero.hasMany(models.Pelicula,{
            as:"Peliculas",
            foreignKey:"generoId"
        })
    }
    /////////////////////////////////////////////////////

    return Genero
  
}