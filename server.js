// Variaveis de ambiente no arquivo .env
require('dotenv').config()

// Inicializa o express
const express = require('express')
const app = express()

// Modela o nosso banco de dados
const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database')
    app.emit('start')
  })
  .catch(e => console.log('Error connecting to database: ' + e.message))

// Identificar o navegador do cliente e salvar um cookie
const session = require('express-session')

// Salva as sessions dentor da base de datos
const MongoStore = require('connect-mongo')

// Envia mensagens rápidas, salvas em sessions
const flash = require('connect-flash')

// Rotas da nossa aplicação
const routes = require('./routes')

// Para manipular caminhos
const path = require('path')

// Recomendação do express para deixar a nossa aplicação mais segura, no processo de produção, e não é recomendado no processo de desenvolvimento
const helmet = require('helmet')

// Tokens para o nossos formularios, por segurança
const csrf = require('csurf')

// middlewares são funções que são executadas no meio do caminho de uma rota
const { checkCsrfError, variablesLocalsMiddleware } = require('./src/middlewares/middleware')

// habilite somente no processo de produção
// app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// Configuração de sessions
const sessionOptions = session({
  secret: process.env.SECRET,
  store: MongoStore.create({ mongoUrl: process.env.CONNECTION_URL }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})
app.use(sessionOptions)

app.use(flash())

app.use(csrf())

// Nossos proprios middlewares
app.use(checkCsrfError)
app.use(variablesLocalsMiddleware)

app.use(routes)

app.on('start', () => {
  app.listen(3000, () => {
    console.log('Acessar: http://localhost:3000')
    console.log('Servidor Executando na porta 3000')
  })
})