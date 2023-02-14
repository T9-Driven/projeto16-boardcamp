import { Router } from 'express'
import { create, getAll } from '../controllers/rentals.controller.js'
import { validSchemaRentals } from '../middlewares/rentals.middleware.js'

const rentalsRouter = Router()

rentalsRouter.get('/rentals', getAll)
rentalsRouter.post('/rentals', validSchemaRentals, create)

export default rentalsRouter