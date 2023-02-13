import { db } from '../configs/database.js'
import { createGameSchema } from '../schemas/games.schema.js'

export async function validSchemaGames(req, res, next) {
  const game = req.body

  const { error } = createGameSchema.validate(game)

  if (error) {
    const errors = error.details.map((detail) => detail.message)
    return res.status(400).send({ errors })
  }

  const gameExists = await db.query('SELECT * FROM games WHERE name=$1', [game.name])

  if (gameExists.rowCount !== 0) return res.sendStatus(409)

  res.locals.game = game

  next()
}