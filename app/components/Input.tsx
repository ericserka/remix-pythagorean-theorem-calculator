import type { FC, InputHTMLAttributes } from 'react'
import { useField } from 'remix-validated-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
}

export const Input: FC<InputProps> = ({ name, label, ...rest }) => {
  const { error, getInputProps } = useField(name)

  return (
    <span className="flex flex-col">
      <label htmlFor={name} className="mb-3">
        {label}
      </label>
      <input
        className="border border-black p-1"
        {...rest}
        {...getInputProps({ id: name })}
      />

      {error && <span className="text-red-500 mt-3">{error}</span>}
    </span>
  )
}
