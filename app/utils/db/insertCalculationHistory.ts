import { db } from '~/db/config.server'
import { calculationHistory } from '~/db/schema.server'
import { calculateHypotenuse } from '../calculateHypotenuse'

export const insertCalculationHistory = (sideA: number, sideB: number) =>
  db
    .insert(calculationHistory)
    .values({ sideA, sideB, hypotenuse: calculateHypotenuse(sideA, sideB) })
    .run()
