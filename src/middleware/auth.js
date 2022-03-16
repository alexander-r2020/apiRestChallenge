const{verifyToken}=require('../helpers/generateToken')

const checkAuth = async (req,res,next)=>{
    try{
    const token = req.headers.authorization.split(' ').pop() // del token corta para verificar con la palabra clave
    const tokenData = await verifyToken(token) // usa la funcion del token

    if(tokenData.id){
        next()
    }else{
        res.status(409)
        res.send({error:"No tienes permisos"})
    }
    }catch(e){
        res.status(409)
        res.send({error:"No tienes permisos"})
    }
    
}
module.exports = checkAuth