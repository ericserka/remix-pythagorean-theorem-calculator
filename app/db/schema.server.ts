import { sql } from 'drizzle-orm'
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const calculationHistory = sqliteTable('calculation_history', {
  id: integer('id').primaryKey(),
  side_a: real('side_a').notNull(),
  side_b: real('side_b').notNull(),
  hypotenuse: real('hypotenuse').notNull(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`),
})
