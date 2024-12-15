import clsx from 'clsx'

interface BulletProps {
  isCurrentIndex: boolean
  onClick: () => void
}
export const Bullet = ({ isCurrentIndex, onClick }: BulletProps) => {
  const defaultClasses = 'size-5 rounded-full mx-1 inline-block cursor-pointer'

  const classes = clsx(defaultClasses, {
    'bg-primary': isCurrentIndex,
    'bg-inherit border border-primary': !isCurrentIndex
  })
  return <div className={classes} onClick={onClick}></div>
}
