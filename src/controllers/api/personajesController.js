const db = require("../../database/models");
const { Op } = require("sequelize");
const {validationResult} = require('express-validator')

const Actors = db.Personaje;
const Movies=db.Pelicula;

const controlador = {
  characterAll: (req, res) => {
    if(req.query.name){
        const {name}=req.query
        Actors.findAll({
            where:{
                nombre:{
                    [Op.substring]: `%${name}%`
                }
            }
        })
        .then(actor=>{
            res.json({
                meta: {
                  status: 302,
                  total: actor.length,
                  url: `/characters?name=${name}`,
                },
                data: actor,
              })
        })
        .catch(error=>console.log(error))
    }else if(req.query.age){
        const{age}=req.query
        Actors.findAll({
            where:{
                edad:age
            }
        })
        .then(actor=>{
            res.json({
                meta: {
                  status: 302,
                  total: actor.length,
                  url: `/characters?age=${age}`,
                },
                data: actor,
              })
        })
        .catch(error=>console.log(error))
    }else if(req.query.movies){
        const{movies}=req.query
        Movies.findAll({
          where:{
            titulo:{
                [Op.substring]: `%${movies}%`
            }
        },
          include:[{association:"Personajes"}]
        })
        .then(movie=>{
            res.json({
            meta: {
              status: 302,
              total: movie.length,
              url: `/characters?movies=${movies}`,
            },
            data: movie,
          })
        })
        
        .catch(error=>console.log(error))
        
    }else{
        Actors.findAll()
        .then((actor) => {
        if(actor.length > 0){
       
        const data = actor.map((e) => {
          return {
            id: e.id,
            imagen: e.imagen,
            nombre: e.nombre,
          };
        });

        res.json({
          meta: {
            status: 200,
            total: data.length,
            url: "/characters",
          },
          data: data,
        });
    }else{
        res.json({
            meta: {
              status: 204,
              msg:"No content",
              url: "/characters"
            }
          });
    }
      })
    
      .catch((error) => console.log(error));
    }    
  },

  createCharacter: (req, res) => {
    
    const errors = validationResult(req)

    if(req.fileValidationError){

      let img = {
          param:"imagen",
          msg:req.fileValidationError,

      }
      errors.errors.push(img)

      res.status(403)
      res.send({errors:errors.array()})
  }else{

      Actors.create(req.body)
      .then((actor) => {
        res.status(201).json({
          meta: {
            status: 201,
            total: actor.length,
            url: "/characters",
          },
        });
      })
      .catch((error) => console.log(error));
    }
    
  },
  updateCharacter: (req, res) => {
    const { id } = req.params;
    const { imagen, nombre, edad, peso, historia } = req.body;

    if(req.fileValidationError){

      let img = {
          param:"imagen",
          msg:req.fileValidationError,

      }
      errors.errors.push(img)

      res.status(403)
      res.send({errors:errors.array()})
  }else{
    
      Actors.update(
        {
          imagen,nombre,edad,peso,historia
        },
        {
          where: { id: +id },
        }
      ).then((edited) => {
        let respuesta;
        if (edited[0] === 1) {
          respuesta = {
            meta: {
              status: 202,
              total: edited.length,
              url: "/characters/:id",
            },
          };
          res.status(202).json(respuesta);
        } else {
          respuesta = {
            meta: {
              status: 304,
              total: edited.length,
              url: "/characters/:id",
            },
          };
          res.status(304).json(respuesta);
        }
      })
      .catch(error=>console.log(error))
    }
   
  },
  deleteCharacter: (req, res) => {
    const { id } = req.params;
    Actors.destroy({
      where: { id: id },
    })
    .then(response=>{
        let respuesta;
        if(response !== 0){
            respuesta = {
                meta: {
                  status: 204,
                  url: "/characters/:id",
                },
              };
              res.status(204).json(respuesta)
        }else{
            respuesta = {
                meta: {
                  status: 400,
                  url: "/characters/:id",
                },
              };
              res.status(400).json(respuesta)
        }
        
    })
    .catch(error=>console.log(error))
  },
  detailCharacter: (req, res) => {
    const {id}=req.params
         
    Actors.findByPk(id,{
        include:[{association:"Peliculas"}]
    })
    .then(actor=>{
        if(actor !== null){
        res.json({ 
            meta: {
            status: 200,
            total: actor.length,
            url: `/characters/detail/${id}`,
          },
          data: actor
    })
    }else{
        res.status(404).json({
            meta:{
                status:404,
                msg:"Not found",
                url:`/characters/detail/${id}`
            }
        })
    }
  })
  .catch(error=>console.log(error))

}
};

module.exports = controlador;
