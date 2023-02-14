import { db } from '../configs/database.js'
import { createRentalSchema } from '../schemas/rentals.schema.js'

export async function validSchemaRentals(req, res, next) {
  const rental = req.body

  const { error } = createRentalSchema.validate(rental)

  if (error) {
    const errors = error.details.map((detail) => detail.message)
    return res.status(400).send({ errors })
  }

  const customerExists = await db.query('SELECT * FROM customers WHERE id=$1', [rental.customerId])
  const gameExists = await db.query('SELECT * FROM games WHERE id=$1', [rental.gameId])
  const checkGameStock = await db.query('SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" IS NULL', [rental.gameId])

  const countRentalGameStock = checkGameStock.rowCount
  const stockTotalGame = gameExists.rows[0].stockTotal

  if (
    customerExists.rowCount === 0 ||
    gameExists.rowCount === 0 ||
    countRentalGameStock >= stockTotalGame
  )
    return res.sendStatus(400)

  res.locals.rental = { ...rental, pricePerDay: gameExists.rows[0].pricePerDay }

  next()
}