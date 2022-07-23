exports.checkCsrfError = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    console.log(err)
    return res.render('error', {
      title: 'Error: ' + err.message
    })
  }

  if (err) {
    return res.render('error', {
      title: 'Error: ' + err.message
    })
  }

}

exports.variablesLocalsMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  res.locals.errors = req.flash('errors')
  res.locals.success = req.flash('success')
  res.locals.user = req.session.user
  next()
}

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash('errors', 'Você precisa fazer entrar primeiro.')
    req.session.save(() => {
      res.redirect('/login/')
    })
    return
  }
  next()
}

exports.loginIsNotRequired = (req, res, next) => {
  if(req.session.user) {
    req.flash('errors', 'Você já está logado no sistema.')
    req.session.save(() => {
      res.redirect('/')
    })
    return
  }
  next()
}