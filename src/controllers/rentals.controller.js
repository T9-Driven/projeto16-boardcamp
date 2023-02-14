import { db } from '../configs/database.js'
import dayjs from 'dayjs'

export async function getAll(req, res) {
  try {
    const { rows } = await db.query(`
    SELECT r.*, c.id AS cid, c.name as cname,
    g.id as gid, g.name as gname
    FROM rentals as r
    JOIN customers as c
      ON r."customerId" = c.id
    JOIN games as g
      ON r."gameId" = g.id
    `)

    const results = rows.map(({ cid, cname, gid, gname, ...rental }) => {
      return {
        ...rental,
        customer: {
          id: cid,
          name: cname
        },
        game: {
          id: gid,
          name: gname
        }
      }
    })

    res.send(results)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function create(req, res) {
  const { customerId, gameId, daysRented, pricePerDay } = res.locals.rental

  try {
    const originalPrice = daysRented * pricePerDay

    await db.query(`
    INSERT 
    INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
    VALUES ($1, $2, $3, $4, null, $5, null);
    `, [customerId, gameId, dayjs().format('YYYY-MM-DD'), daysRented, originalPrice])

    res.sendStatus(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
