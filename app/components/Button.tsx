import type { ButtonHTMLAttributes, FC } from 'react'
import { useIsSubmitting, useIsValid } from 'remix-validated-form'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export const Button: FC<ButtonProps> = ({ title, ...rest }) => {
  const isSubmitting = useIsSubmitting(),
    isValid = useIsValid()

  return (
    <button
      className="border border-black bg-gray-300 p-1 disabled:opacity-50"
      {...rest}
      disabled={!isValid || isSubmitting}
    >
      {isSubmitting ? 'Loading...' : title}
    </button>
  )
}
