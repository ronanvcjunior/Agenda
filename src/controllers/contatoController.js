const Contato = require("../models/ContatoModel")

exports.index = (req, res) => {
  return res.render('contato', {
    title: 'Contato',
    contato: {}
  })
}

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body)
    await contato.register()

  if(contato.errors.length > 0) {
    req.flash('errors', contato.errors)
    req.session.save(() => {
      return res.redirect('back')
    })
    return
  }
  
    req.flash('success', 'Seu contato foi registrado com sucesso')
    req.session.save(() => {
      return res.redirect(`/contato/${contato.contato._id}`)
    })
  } catch (error) {
    return res.render('error', {
      error: 'Error: ' + error.message
    })
  }
}

exports.editIndex = async (req, res) => {
  if(!req.params.id) return res.render('error', {
    title: 'Esse contato não foi possível ser acessado ou não existe.',
  })

  const contato = await Contato.getContatoById(req.params.id)

  if(!contato) return res.render('error', {
    title: 'Esse contato não foi possível ser acessado ou não existe.',
  })

  return res.render('contato', {
    title: 'Contato',
    contato
  })
}

exports.edit = async (req, res) => {
  try {
    if(!req.params.id) return res.render('error', {
      title: 'Esse contato não foi possível ser acessado ou não existe.',
    })
    
    const contato = new Contato(req.body)
    await contato.edit(req.params.id)

  if(contato.errors.length > 0) {
    req.flash('errors', contato.errors)
    req.session.save(() => {
      return res.redirect('back')
    })
    return
  }
  
    req.flash('success', 'Seu contato foi atualizado com sucesso')
    req.session.save(() => {
      return res.redirect(`/contato/${contato.contato._id}`)
    })
  } catch (error) {
    return res.render('error', {
      error: 'Error: ' + error.message
    })
  }
}