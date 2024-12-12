import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { generateSnowflake } from '#apps/shared/services/snowflake_service'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare coins: number

  @column()
  declare level: number

  @column()
  declare userId: string

  @column()
  declare playerUuid: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @beforeCreate()
  public static async generateUuid(model: Player) {
    if (!model.id) {
      model.id = generateSnowflake()
    }
  }
}
