import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'players'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.integer('coins').notNullable()
      table.integer('level').notNullable()
      table.string('user_id').notNullable().references('users.id').onDelete('CASCADE')
      table.string('player_uuid').notNullable().unique()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
