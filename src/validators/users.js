const {check} = require('express-validator')
const {validateResult} = require('../helpers/validateHelper')

const validatorUsers=[
  
    check('email')
        .notEmpty().withMessage('Este campo no puede estar vacio').bail()
        .isEmail().withMessage('Debe ingresar un correo valido'),
    check('password')
        .notEmpty().withMessage('Este campo no puede estar vacio').bail()
        .isLength({min:8}).withMessage('La contraseña debe tener un minimo de 8 caracteres'),
    
        (req,res,next)=>{
            validateResult(req,res,next)
        }
        
]
module.exports={validatorUsers}