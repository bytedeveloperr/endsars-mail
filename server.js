require("dotenv").config()
const express = require("express")
const path = require("path")
const http = require("http")
const routes = require("./src/routes")
require("./src/libs/cron")

const app = express()
const server = http.createServer(app)

global.print = (...val) => {
	if (process.env.NODE_ENV !== 'production') {
		console.log(...val)
	}
}

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "./src/views"))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => print(`Listening on port ${PORT}`))
