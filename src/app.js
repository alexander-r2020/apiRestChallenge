const express = require('express');
const app = express();
const morgan = require('morgan')
const path = require('path')
const PORT = process.env.PORT || 3001

const userRouter = require('./routes/api/userRouter')
const characterRouter = require('./routes/api/personajeRouter')
const moviesRouter = require('./routes/api/movieRouter')

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(morgan('dev'))
app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));

// JSON - Para que pueda leer JSON
app.use(express.json());

//endPoints Login y Register
app.use('/auth',userRouter)

//endPoints Characters
app.use('/characters',characterRouter)

//endPoints Movies
app.use('/movies',moviesRouter)

//not found page
app.use(function(req, res, next) {
    next(createError(404));
  });
app.use(function(err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.status(404).json({
        meta:{
            status:404,
            msg:"Not found page"
        }
    })
  });

//Runnig Server
app.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})