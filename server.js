// usando o express
const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    noCache: true,
    autoescape: false
})

server.listen(4000, () => {
    console.log('Server is on!')
})