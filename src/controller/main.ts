import { Router, Request, Response } from "express"

const app = Router()

app.get("/", (req: Request, res: Response) => { res.render("index.ejs")	})
app.get("/login", (req: Request, res: Response) => { res.send("Ok") })

export default app;