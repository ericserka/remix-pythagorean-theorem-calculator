import { desc } from 'drizzle-orm'
import { db } from '~/db/config.server'
import { calculationHistory } from '~/db/schema.server'

export const listCalculationHistory = () =>
  db
    .select()
    .from(calculationHistory)
    .orderBy(desc(calculationHistory.id))
    .all()
