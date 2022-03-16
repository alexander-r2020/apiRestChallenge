
module.exports = (sequelize,DataTypes) =>{
    let alias = 'Personaje';
    let cols = {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        imagen:{
            type:DataTypes.STRING,
            allowNull: false
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull: false
        },
        edad:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },
        peso:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },
        historia:{
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
    const Personaje = sequelize.define(alias,cols,config)

    /////////////////////////////////////////////////////
    Personaje.associate = function(models){
        Personaje.belongsToMany(models.Pelicula,{
            as:"Peliculas",
            through:"personaje_peliculas", //nombre de tabla intermedia
            foreignKey:"personajeId", //nombre del id en la tabla intermedia
            otherKey:"peliculaId", //nombre del segundo id en la tabla intermedia
            timestamps:true
        })
    }
    /////////////////////////////////////////////////////

    return Personaje
  
}