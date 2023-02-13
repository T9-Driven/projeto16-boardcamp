import { db } from '../configs/database.js'

export async function getAll(req, res) {
  try {
    const games = await db.query('SELECT * FROM games')

    res.send(games.rows)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function create(req, res) {
  const { name, image, stockTotal, pricePerDay } = res.locals.game

  try {
    await db.query(`
    INSERT INTO games (name, image, "stockTotal", "pricePerDay") 
    VALUES ($1, $2, $3, $4);
    `, [name, image, stockTotal, pricePerDay])

    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}