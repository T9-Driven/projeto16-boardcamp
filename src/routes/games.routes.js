import { Router } from 'express'
import { create, getAll } from '../controllers/games.controller.js'
import { validSchemaGames } from '../middlewares/games.middleware.js'

const gameRouter = Router()

gameRouter.get('/games', getAll)
gameRouter.post('/games', validSchemaGames, create)

export default gameRouter