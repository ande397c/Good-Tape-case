import clsx from 'clsx'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  startIcon?: IconDefinition
}

export const Input = ({ label, ...inputProps }: InputProps) => {
  return (
    <>
      {label && (
        <label className="block" htmlFor={inputProps.name}>
          {label}
        </label>
      )}
      <input
        {...inputProps}
        className={clsx(
          'w-full h-8 rounded-md pl-2 bg-white border border-grey placeholder:text-black/60 text-black',
          {}
        )}
      />
    </>
  )
}
