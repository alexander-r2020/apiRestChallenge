const express = require('express');
const router = express.Router();
const {login,register} = require('../../controllers/api/usersController')
const {validatorUsers}=require('../../validators/users')

/* GET LOGIN y REGISTER. */
router.post('/login',validatorUsers ,login);
router.post('/register',validatorUsers ,register);


module.exports = router;