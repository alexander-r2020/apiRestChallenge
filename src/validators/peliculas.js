const {check} = require('express-validator')
const {validateResult} = require('../helpers/validateHelper')

const validatorMovies=[

    check('titulo')
        .notEmpty().withMessage('Este campo no puede estar vacio'),
    check('calificacion')
        .notEmpty().withMessage('Este campo no puede estar vacio').bail()
        .isNumeric().withMessage('Este campo tiene que ser Numerico')
        .custom((value,{req})=>{
            if(value < 1 || value > 5 ){
                throw new Error('La calificacion debe ser entre 1 y 5')
            }
            return true
        }),
        
        (req,res,next)=>{
            validateResult(req,res,next)
        }
        
]
module.exports={validatorMovies}