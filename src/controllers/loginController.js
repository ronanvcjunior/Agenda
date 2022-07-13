exports.index = (req, res) => {
  return res.render('login', {
    title: 'Login',
  })
}