const Contato = require("../models/ContatoModel")

exports.index = async (req, res) => {
  const contatos = await Contato.getListOfContatos()
  return res.render('index', {
    title: 'Homepage',
    contatos
  })
}