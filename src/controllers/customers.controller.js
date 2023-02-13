import { db } from '../configs/database.js'

export async function getAll(req, res) {
  try {
    const customers = await db.query('SELECT * FROM customers')

    res.send(customers.rows)
  } catch (error) {
    res.status(500).send(error.message)
  }
}


export async function create(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer

  try {
    await db.query(`
    INSERT INTO customers (name, phone, cpf, birthday) 
    VALUES ($1, $2, $3, $4);
    `, [name, phone, cpf, birthday])

    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}