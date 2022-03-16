const db = require("../../database/models");
const { encrypt, compare } = require("../../helpers/handleBcrypt");
const { tokenSign } = require("../../helpers/generateToken");
const sgMail = require('../../helpers/sendGrid')
const Users = db.Usuario;

const controlador = {
  login: (req, res, next) => {
    const { email, password } = req.body;
    Users.findOne({
      where: {
        email: email,
      },
    }).then((user) => {
      if (user == null) {
        res.status(404);
        res.send({ error: "User not found" });
      }

      compare(password, user.password)
        .then((checkPass) => {
          const tokenSession = tokenSign(user);//dando un token
          if (checkPass) {
            res.status(200);
            res.send({
              data: user,
              tokenSession,
            });
          } else {
            res.status(409);
            res.send({ error: "Invalid Password" });
          }
        })
        .catch((error) => console.log(error));
    });
  },
  register: (req, res, next) => {
    const { email, password } = req.body;
    //subgrid
    const msg={
      to: email,
      from: 'lopezcorreo2022@gmail.com',
      subject:'Bienvenido',
      text:'gracias por registrarte',
      html:'<strong>Bienvenido a esta aplicacion de personajes y peliculas</strong>',
      mail_settings:{
        sandbox_mode:{
          enable: false // false permite enviar email, true solo prueba
        }
      }
    }

    const passwordHash = encrypt(password);
    Users.create({
      email: email,
      password: passwordHash,
    })
      .then((user) => {
        const tokenSession = tokenSign(user);//dando token

        sgMail.send(msg)
        .then(()=>{})
        .catch(error=>console.log(error))

        res.status(201).json({
          meta: {
            status: 201,
            total: user.length,
            url: "/auth/register",
            tokenSession,
          },
        });
      })
      .catch((error) => console.log(error));
  },
};

module.exports = controlador;
