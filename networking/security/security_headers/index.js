const express = require('express')

const app=express()

const PORT =process.env.PORT || 5000

const redirectToHttps = (req, res, next) => {
  if(req.header['x-forwarded-proto'] !== 'https') {
    // redirect to https
    return res.redirect(['https://', req.get('Host'), req.url].join(''))
  }
  next()
}
app.use(redirectToHttps)

app.use('/', (req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.removeHeader('X-Powered-By')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Strict-Transport-security', 'max-age=31526000; includeSubDomains; prelaod')
  next()
})

app.get('/list', (req, res) => {
  res.send([{
    id: 1,
    title: "Namaste frontend system design"
  }])
})

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`)
})