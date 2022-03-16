const {check} = require('express-validator')
const {validateResult} = require('../helpers/validateHelper')

const validatorActors=[
  
    check('nombre')
        .notEmpty().withMessage('Este campo no puede estar vacio'),
    check('edad')
        .notEmpty().withMessage('Este campo no puede estar vacio').bail()
        .isNumeric().withMessage('Este campo tiene que ser Numerico'),
    check('peso')
        .notEmpty().withMessage('Este campo no puede estar vacio').bail()
        .isNumeric().withMessage('Este campo tiene que ser Numerico'),  
    check('historia')
        .notEmpty().withMessage('Este campo no puede estar vacio'),
        (req,res,next)=>{
            validateResult(req,res,next)
        }
        
]
module.exports={validatorActors}