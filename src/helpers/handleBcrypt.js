const bcrypt = require('bcryptjs');

const encrypt = (text) =>{
    const encryptText= bcrypt.hashSync(text, 10)
    return encryptText
}

const compare = (passwordText,hashPassword)=>{
    return bcrypt.compare(passwordText,hashPassword)
}

module.exports={encrypt,compare}