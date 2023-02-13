import joi from 'joi'

export const createCustomerSchema = joi.object({
  name: joi.string().min(2).required(),
  phone: joi.string().min(10).max(11).pattern(/^\d+$/).required(),
  cpf: joi.string().length(11).pattern(/^\d+$/).required(),
  birthday: joi.date().required()
})