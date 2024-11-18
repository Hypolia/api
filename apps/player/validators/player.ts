import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

/**
 * Validator to validate the payload when creating
 * a new player.ts.
 */
export const createPlayerValidator = vine.compile(
  vine.object({})
)

/**
 * Validator to validate the payload when updating
 * an existing player.ts.
 */
export const updatePlayerValidator = vine.compile(
  vine.object({})
)

export type CreatePlayerSchema = Infer<typeof createPlayerValidator>
export type UpdatePlayerSchema = Infer<typeof updatePlayerValidator>