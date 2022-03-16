const express = require('express');
const router = express.Router();
const {moviesAll,createMovies, updateMovies, deleteMovies,detailMovies} = require('../../controllers/api/moviesController')
const {validatorMovies}=require('../../validators/peliculas')
const imgUpload = require('../../middleware/middlewareStorageMovie')

/* GET MOVIES ALL AND SEARCH CHARACTER*/
router.get('/',moviesAll);

/* CREATE MOVIES. */
router.post('/',imgUpload.single('imagen'),validatorMovies ,createMovies);

/* EDIT CHARACTER*/
router.put('/:id', imgUpload.single('imagen'),validatorMovies,updateMovies);

/* DELETE CHARACTER*/
router.delete('/:id', deleteMovies);

/*DETAIL CHARACTER */
router.get('/detail/:id',detailMovies)



module.exports = router;