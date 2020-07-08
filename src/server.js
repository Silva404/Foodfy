const express = require("express")
const nunjucks = require("nunjucks")
const routes = require('./routes')
const methodOverride = require('method-override')

const server = express();

server.set("view engine", "njk")
server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"))
server.use(methodOverride('_method'))
server.use(routes)

nunjucks.configure("src/app/views", {
    express: server,
    noCache: true,
    autoescape: false,
})

server.listen(3000, () => {
    console.log("Server is on!")
})