import clsx from 'clsx'
import { SpinnerIcon } from '../icons/SpinnerIcon'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ButtonProps {
  text?: string
  isDisabled?: boolean
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
  width?: 'full' | '1/2' | 'fit'
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  icon?: IconDefinition
  onClick?: () => void
}

export const Button = ({
  text,
  isDisabled,
  isLoading,
  type = 'submit',
  width = 'full',
  variant = 'primary',
  className,
  icon,
  onClick
}: ButtonProps) => {
  const defaultClasses =
    'rounded-md h-9 text-center flex justify-center items-center gap-2 transition-all duration-150'

  const primaryClasses =
    'bg-primary text-white hover:bg-primaryHover border-none'

  const secondaryClasses = 'bg-white text-primary border border-primary'

  const outlineClasses = 'bg-inherit'

  const disabledClasses = 'opacity-60 pointer-events-none'

  const classes = clsx(defaultClasses, className, {
    [primaryClasses]: variant === 'primary',
    [secondaryClasses]: variant === 'secondary',
    [outlineClasses]: variant === 'outline',
    'w-full': width === 'full',
    'w-1/2': width === '1/2',
    'w-fit': width === 'fit',
    [disabledClasses]: isDisabled || isLoading
  })

  return (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? <SpinnerIcon /> : text}
      {icon && <FontAwesomeIcon icon={icon} />}
    </button>
  )
}
