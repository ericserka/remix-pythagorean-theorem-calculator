import type { DataFunctionArgs, V2_MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { withZod } from '@remix-validated-form/with-zod'
import { ValidatedForm, validationError } from 'remix-validated-form'
import { z } from 'zod'
import { Button } from '~/components/Button'
import { CalculationHistory } from '~/components/CalculationHistory'
import { Input } from '~/components/Input'
import triangle from '~/images/triangle.svg'
import { insertCalculationHistory } from '~/utils/db/insertCalculationHistory'
import { listCalculationHistory } from '~/utils/db/listCalculationHistory'

const validator = withZod(
  z.object({
    sideA: z.string().refine((val) => parseFloat(val) > 0, {
      message: 'must be a valid positive number',
    }),
    sideB: z.string().refine((val) => parseFloat(val) > 0, {
      message: 'must be a valid positive number',
    }),
  })
)

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Pythagorean Theorem Calculator' }]
}

export const loader = () => {
  const result = listCalculationHistory()
  return json(result)
}

export const action = async ({ request }: DataFunctionArgs) => {
  const { error, data } = await validator.validate(await request.formData())
  if (error) {
    return validationError(error)
  }
  const floatSizeA = parseFloat(data.sideA),
    floatSizeB = parseFloat(data.sideB)

  insertCalculationHistory(floatSizeA, floatSizeB)
  return redirect('/')
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="m-12">
      <h1 className="text-center text-4xl font-bold">
        Pythagorean Theorem Calculator
      </h1>
      <div className="flex justify-center mt-12">
        <img className="w-1/12" src={triangle} alt="triangle" />
      </div>
      <div className="flex justify-center mt-6">
        <span className="font-semibold text-xl">
          a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>
        </span>
      </div>
      <div className="flex justify-around mt-12">
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">
            New calculation
          </h2>
          <ValidatedForm
            className="space-y-6"
            method="POST"
            validator={validator}
          >
            <Input name="sideA" label="Side A" type="number" step="any" />
            <Input name="sideB" label="Side B" type="number" step="any" />
            <Button title="Calculate" type="submit" />
            <div>
              <span className="font-bold">Last answer:</span>{' '}
              {data?.[0]?.hypotenuse ?? 'N/A'}
            </div>
          </ValidatedForm>
        </div>
        <div className="min-w-[835px]">
          <h2 className="text-2xl font-bold text-center mb-6">
            Calculation history
          </h2>
          <CalculationHistory data={data} />
        </div>
      </div>
    </div>
  )
}
