const express = require('express')
const route = express.Router()

const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')
const { loginRequired, loginIsNotRequired } = require('./src/middlewares/middleware')

// Rotas da index
route.get('/', homeController.index)

// Rotas de Login
route.get('/login', loginIsNotRequired, loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

// Rotas de Contato
route.get('/contato', loginRequired, contatoController.index)
route.post('/contato/register', loginRequired, contatoController.register)
route.get('/contato/:id', loginRequired, contatoController.editIndex)
route.post('/contato/:id', loginRequired, contatoController.edit)
route.get('/contato/delete/:id', loginRequired, contatoController.delete)

module.exports = route