const jwt = require('jsonwebtoken')

// genera el token y con los datos del usuario
const tokenSign =(user)=>{
    return jwt.sign(
        {
            id:user.id,
            email:user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1h"
        }
    )
}
// verifica que sean los mismos codigos del token
const verifyToken = async(token)=>{
    try{
        return jwt.verify(token,process.env.JWT_SECRET)
    } catch(e){
        return null
    }
    
}

module.exports={tokenSign,verifyToken}