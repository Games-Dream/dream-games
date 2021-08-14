import express from "express"
import Routes from "./controller/main"
import path from "path"

// dev
import dotenv from "dotenv"
dotenv.config()
// --

const app = express()

app.use(express.static(path.join(process.cwd(), "/src/public")))
app.set("view engine", "ejs")
app.use(express.json())

app.use(Routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log("Online")
})