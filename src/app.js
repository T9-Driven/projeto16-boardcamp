import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import gameRouter from './routes/games.routes.js'
import customerRouter from './routes/customers.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use([gameRouter, customerRouter])

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Servidor funfando na porta: ${PORT}`))