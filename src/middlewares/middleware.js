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
  next()
}