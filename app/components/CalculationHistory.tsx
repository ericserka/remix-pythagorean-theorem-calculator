import type { InferModel } from 'drizzle-orm'
import type { FC } from 'react'
import type { calculationHistory } from '~/db/schema.server'

interface CalculationHistoryProps {
  data: InferModel<typeof calculationHistory>[]
}

export const CalculationHistory: FC<CalculationHistoryProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <p className="text-center">
        All calculations made will appear here. You haven't done any
        calculations yet.
      </p>
    )
  }
  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="border border-black">
            <th>ID</th>
            <th>Side A</th>
            <th>Side B</th>
            <th>Hypotenuse (Side C)</th>
            <th>Timestamp (UTC)</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr className="text-center border border-black" key={item.id}>
              <td>{item.id}</td>
              <td>{item.sideA}</td>
              <td>{item.sideB}</td>
              <td>{item.hypotenuse}</td>
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
