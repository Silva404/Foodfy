const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')

const server = express()

server.use(express.static('public'))

server.set('view engine', 'njk')

server.get('/', (requisition, response) => {
    return response.redirect('/home')
})

server.get('/home', (requisition, response) => {
    return response.render('index')
})

server.get('/recipes', (requisition, response) => {
    return response.render('recipes')
})

nunjucks.configure('views', {
    express: server,
    noCache: true,
    autoescape: false
})

server.listen(3000, () => {
    console.log('Server is on!')
})