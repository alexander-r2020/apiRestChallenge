const db = require("../../database/models");
const {validationResult} = require('express-validator')
const { Op } = require("sequelize");

const Movies=db.Pelicula
const Genres = db.Genero

const controlador = {
    moviesAll:(req, res, next)=> {

      if(req.query.name){
        const {name}=req.query
        Movies.findAll({
            where:{
                titulo:{
                    [Op.substring]: `%${name}%`
                }
            }
        })
        .then(movie=>{
          if(movie.length !== 0){
            res.status(302)
            res.json({
                meta: {
                  status: 302,
                  total: movie.length,
                  url: `/characters?name=${name}`,
                },
                data: movie,
              })
          }else{
            res.json({
              meta:{
                status:404,
                msg:"movie not found"
              }
            })
          }
           
        })
        .catch(error=>console.log(error))
    }else if(req.query.genre){
        const{genre}=req.query
        Genres.findAll({
            where:{
                nombre:{
                  [Op.substring]: `%${genre}%`
                }
            },
            include:[{all:true}]
        })
        .then(genre=>{
          if(genre.length !== 0){
            res.status(302)
            res.json({
                meta: {
                  status: 302,
                  total: genre.length,
                  url: `/characters?age=${genre}`,
                },
                data: genre,
              })
            }else{
              res.json({
                meta:{
                  status:404,
                  msg:"genre not found"
                }
              })
            }
        })
        .catch(error=>console.log(error))
    }else if(req.query.order){
        const{order}=req.query
        if(order.toLocaleUpperCase() === "ASC"){
          Movies.findAll()
          .then((movie)=>{
            res.status(200)
            res.json({
              meta: {
                status: 200,
                total: movie.length,
                url: `/characters?order=${order}`,
              },
              data: movie,
            })
          })
          .catch(error=>console.log(error))
        }else if(order.toLocaleUpperCase()==="DESC"){
        Movies.findAll({
          order: [
            ['fecha_de_creacion', 'DESC']
        ]
          
        })
        .then(movie=>{
            res.json({
            meta: {
              status: 200,
              total: movie.length,
              url: `/characters?order=${order}`,
            },
            data: movie,
          })
        })
        
        .catch(error=>console.log(error))
      }else{
        res.status(400)
        res.json({
          meta: {
            status: 400,
            msg: "not found order",
          }
          
        })
      }
        
    }else{
      Movies.findAll({
        include:[{all:true}]
    })
    .then((movie) => {
        
    if(movie.length > 0){
   
    const data = movie.map((e) => {
      return {
        id: e.id,
        imagen: e.imagen,
        titulo: e.titulo,
        tiempo_creado:e.createdAt
      };
    });

    res.json({
      meta: {
        status: 200,
        total: data.length,
        url: "/movies",
      },
      data: data,
    });
}else{
    res.json({
        meta: {
          status: 204,
          msg:"No content",
          url: "/movies"
        }
      });
}
  })

  .catch((error) => console.log(error));
    }
        
      },
    createMovies:(req, res, next)=> {

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

      Movies.create(req.body)
      .then((movie) => {
        res.status(201).json({
          meta: {
            status: 201,
            total: movie.length,
            url: "/movies",
          },
        });
      })
      .catch((error) => console.log(error));
    
    }
    },
    updateMovies:(req,res,next)=>{

    const { id } = req.params;
    const { imagen, titulo, calificacion,generoId} = req.body;
    
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
    
      Movies.update(
        {
          imagen,titulo,calificacion,generoId
        },
        {
          where: { id: +id },
        }
      ).then((edited) => {
        
        if (edited[0] === 1) {
          respuesta = {
            meta: {
              status: 202,
              total: edited.length,
              url: "/movies/:id",
            },
          };
          res.status(202).json(respuesta);
        } else {
          respuesta = {
            meta: {
              status: 400,
              msg:"bad request"
            },
          };
          res.status(400).json(respuesta);
        }
      })
      .catch(error=>console.log(error))
    }
    
    },
    deleteMovies:(req,res,next)=>{
    const { id } = req.params;
    Movies.destroy({
      where: { id: id },
    })
    .then(response=>{
        if(response !== 0){
          res.status(200).json({
            meta: {
              status: 200,
              msg:"Delete movies ok",
              url: "/characters",
            },
          });
        }else{
          res.status(400).json({
            meta: {
              status: 400,
              msg:"bad request",
              url: "/movies",
            },
          });
        }
        
    })
    .catch(error=>console.log(error))
    },
    detailMovies:(req,res,next)=>{
      const {id}=req.params

      Movies.findByPk(id,{
          include:[{association:"Personajes"}]
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
}
    


module.exports=controlador;