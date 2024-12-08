import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new player.ts.
 */
export const createPlayerValidator = vine.compile(
  vine.object({
    playerUuid: vine.string().uuid(),
    level: vine.number().optional(),
    coins: vine.number().optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing player.ts.
 */
export const updatePlayerValidator = vine.compile(vine.object({}))

export const getPlayersValidator = vine.compile(
  vine.object({
    page: vine.number().optional(),
    limit: vine.number().optional(),
  })
)

export type CreatePlayerSchema = Infer<typeof createPlayerValidator>
export type UpdatePlayerSchema = Infer<typeof updatePlayerValidator>
export type GetPlayersSchema = Infer<typeof getPlayersValidator>
