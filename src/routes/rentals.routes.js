import { Router } from 'express'
import { create, getAll, finish, destroy } from '../controllers/rentals.controller.js'
import { validSchemaRentals } from '../middlewares/rentals.middleware.js'
import { validFinishRental } from '../middlewares/rentalsFinish.middleware.js'

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getAll)
rentalsRouter.post('/rentals', validSchemaRentals, create)
rentalsRouter.post('/rentals/:id/return', validFinishRental, finish)
rentalsRouter.delete('/rentals/:id', destroy)

export default rentalsRouter