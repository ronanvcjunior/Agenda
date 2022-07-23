const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  name: {type: 'string', required: true},
  lastname: {type: 'string', required: false, default: ''},
  phone: {type: 'string', required: false, default: ''},
  email: {type: 'string', required: false, default: ''},
  dateCreated: {type: Date, required: false, default: Date.now()},
})

const ContatoModel = mongoose.model('Contatos', ContatoSchema)

function Contato(body) {
  this.body = body
  this.errors = []
  this.contato = null
}

Contato.prototype.register = async function() {
  this.validate()

  if(this.errors.length > 0) return

  this.contato = await ContatoModel.create(this.body)
}

Contato.prototype.validate = function() {
  this.cleanUp()
  // validação
  // O nome é requerido
  if(!this.body.name) this.errors.push('Nome é um campo obrigatório.')

  // O telefone ou email é requerido
  if(!this.body.email && !this.body.phone) this.errors.push('Email ou Telefone é campo obrigatório.')

  // O e-mail precisa ser válido
  if(this.body.email && !validator.isEmail(this.body.email)) 
    this.errors.push('E-mail inválido')

}

Contato.prototype.cleanUp = function() {
  for (const key in this.body) {
    if(typeof this.body[key] !== 'string')
      this.body[key] = ' '
  }

  this.body = {
    name: this.body.name,
    lastname: this.body.lastname,
    phone: this.body.phone,
    email: this.body.email,
  }
}

Contato.getContatoById = async function (id) {
  if (typeof id !== 'string') return
  return user = await ContatoModel.findById(id)
}

module.exports = Contato