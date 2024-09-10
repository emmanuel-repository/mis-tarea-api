const express   = require('express');
const morgan = require('morgan');
const config = require('./config');
const tasks = require('./modules/tasks/routes')
const cors = require("cors");

const app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuracion
app.set('port', config.app.port);

//endpoint de la aplicacion para las tareas
app.use('/api/my-tasks', tasks);

module.exports = app;

