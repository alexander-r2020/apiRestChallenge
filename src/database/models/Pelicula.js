module.exports = (sequelize,DataTypes) =>{
    let alias = 'Pelicula';
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
        titulo:{
            type:DataTypes.STRING,
            allowNull: false
        },
        calificacion:{
            type:DataTypes.DECIMAL,
            allowNull: false
        },
        generoId:{
            type:DataTypes.INTEGER,
            allowNull: false,
            onDelete: "cascade"
        },
        fecha_de_creacion: {
            type: DataTypes.DATEONLY,
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
    const Pelicula = sequelize.define(alias,cols,config)

    /////////////////////////////////////////////////////
    Pelicula.associate = function(models){
        Pelicula.belongsToMany(models.Personaje,{
            as:"Personajes",
            through:"personaje_peliculas", //nombre de tabla intermedia
            foreignKey:"peliculaId", //nombre del id en la tabla intermedia
            otherKey:"personajeId", //nombre del segundo id en la tabla intermedia
            timestamps:true
        }),
        Pelicula.belongsTo(models.Genero,{
            as:"Generos",
            foreignKey:"generoId"
        })

    }

    // Pelicula.associate = function(models){
    //     Pelicula.belongsTo(models.Genero,{
    //         as:"Generos",
    //         foreignKey:"generoId"
    //     })
    // }
    /////////////////////////////////////////////////////

    return Pelicula
  
}