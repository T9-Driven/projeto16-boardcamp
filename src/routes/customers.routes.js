import { Router } from 'express'
import { create, getAll, getById } from '../controllers/customers.controller.js'
import { validSchemaCustomer } from '../middlewares/customers.middleware.js'

const customerRouter = Router()

customerRouter.get('/customers', getAll)
customerRouter.post('/customers', validSchemaCustomer, create)

export default customerRouter