const express = require("express");
const nunjucks = require("nunjucks");
const data = require("./data");
const routes = require("./routes")

const server = express();

server.use(express.static("public"));
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    noCache: true,
    autoescape: false,
})

server.get("/", (requisition, response) => {
    return response.redirect("/home")
})

server.get("/home", (requisition, response) => {
    return response.render("index", { recipes: data })
})

server.get("/recipes", (requisition, response) => {
    return response.render("recipes", { recipes: data })
})

server.get("/recipes/:index", (requisition, response) => {
    const { id } = requisition.params.id
    const recipe = data.find(recipe => recipe.id == id)

    return response.render("recipes", { recipes: recipe })
})

server.listen(3000, () => {
    console.log("Server is on!")
})
