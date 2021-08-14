import express from "express"
import Routes from "./controller/main.js"
import path from "path"

// dev
import dotenv from "dotenv"
dotenv.config()
// --

const app = express()

app.use(require("express-session")({
    secret: "kuka123",
    cookie: {
        maxAge: 86400000,
    },
    resave: true,
    saveUninitialized: false
}));
app.use(express.static(path.resolve(__dirname, '/public')))
app.set('views', __dirname + '/views')
app.set("view engine", "ejs")
app.use(express.json())

app.use(Routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`[SERVER] - Online in port ${port}`)
})