import { Router } from 'express'
import { create, getAll, getById, update } from '../controllers/customers.controller.js'
import { validSchemaCustomer } from '../middlewares/customers.middleware.js'

const customerRouter = Router()

customerRouter.get('/customers', getAll)
customerRouter.get('/customers/:id', getById)
customerRouter.post('/customers', validSchemaCustomer, create)
customerRouter.put('/customers/:id', validSchemaCustomer, update)

export default customerRouter