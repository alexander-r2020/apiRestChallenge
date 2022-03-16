const express = require('express');
const router = express.Router();
const {characterAll,createCharacter, updateCharacter, deleteCharacter,detailCharacter} = require('../../controllers/api/personajesController')
const {validatorActors}=require('../../validators/personajes')
const checkAuth = require('../../middleware/auth')
const imgUpload = require('../../middleware/middlewareStorageActor')

/* GET CHARACTER AND SEARCH CHARACTER*/
router.get('/',checkAuth,characterAll);

/* CREATE CHARACTER. */
router.post('/',checkAuth,imgUpload.single('imagen'),validatorActors,createCharacter);

/* EDIT CHARACTER*/
router.put('/:id',checkAuth,imgUpload.single('imagen'),validatorActors,updateCharacter);

/* DELETE CHARACTER*/
router.delete('/:id',checkAuth,deleteCharacter);

/*DETAIL CHARACTER */
router.get('/detail/:id',checkAuth,detailCharacter)



module.exports = router;