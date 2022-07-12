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

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken()
  next()
}