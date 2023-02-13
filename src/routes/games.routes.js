import { Router } from 'express'
import { create } from '../controllers/games.controller.js'
import { validSchemaGames } from '../middlewares/games.middleware.js'

const gameRouter = Router()

gameRouter.post('/games', validSchemaGames, create)

export default gameRouter