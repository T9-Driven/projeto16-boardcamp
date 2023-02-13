import { db } from '../configs/database.js'

export async function getAll(req, res) {
  try {
    const customers = await db.query('SELECT * FROM customers')

    res.send(customers.rows)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function getById(req, res) {
  const { id } = req.params
  try {
    const customer = await db.query('SELECT * FROM customers WHERE id=$1', [id])

    if (customer.rowCount === 0) return res.sendStatus(404)

    res.send(customer.rows[0])
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

export async function update(req, res) {
  const { name, phone, cpf, birthday, id } = res.locals.customer

  try {
    await db.query(`
    UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;
    `, [name, phone, cpf, birthday, id])

    res.sendStatus(200)
  } catch (error) {
    res.status(500).send(error.message)
  }
}