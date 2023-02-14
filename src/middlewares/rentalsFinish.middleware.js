import { db } from '../configs/database.js'
import dayjs from 'dayjs'
import { createRentalSchema } from '../schemas/rentals.schema.js'

export async function validFinishRental(req, res, next) {
  const { id } = req.params

  let rental = await db.query('SELECT * FROM rentals WHERE id=$1', [id])
  rental = rental.rows[0]

  if (!rental) return res.sendStatus(404)

  if (rental.returnDate) return res.sendStatus(400)

  const returnDate = dayjs().format('YYYY-MM-DD')
  const dateExpiriesAt = dayjs(rental.rentDate, 'day').add(rental.daysRented, 'day')

  const diffDays = dayjs().diff(dateExpiriesAt, 'day')

  let delayFee

  if (diffDays > 0) delayFee = diffDays * (rental.originalPrice / rental.daysRented)

  res.locals.rental = { returnDate, delayFee, id }

  next()
}