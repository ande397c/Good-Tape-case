import clsx from 'clsx'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  startIcon?: IconDefinition
}

export const Input = ({ label, startIcon, ...inputProps }: InputProps) => {
  return (
    <>
      {/* //   <div className="flex justify-center items-center gap-3 group transition-all"> */}
      {label && (
        <label className="block" htmlFor={inputProps.name}>
          {label}
        </label>
      )}

      {/* <div className="relative w-full"> */}
      {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">{startIcon && <FontAwesomeIcon icon={startIcon} color="#9898A0" />}</div> */}
      <input
        {...inputProps}
        className={clsx(
          'w-full h-8 rounded-md pl-2 bg-white border border-grey placeholder:text-black/60 text-black',
          {}
        )}
      />
      {/* </div> */}
      {/* </div> */}
    </>
  )
}
