import { Button } from '../Button'
import {
  faBars,
  faArrowsLeftRightToLine
} from '@fortawesome/free-solid-svg-icons'
import { TView } from '../../types/View'

interface ViewToggleProps {
  setViewPreference: React.Dispatch<React.SetStateAction<TView>>
  viewPreference: TView
}

export const ViewToggle = ({
  setViewPreference,
  viewPreference
}: ViewToggleProps) => {
  const isViewList = viewPreference === 'list'
  return (
    <div className="flex items-center justify-between gap-2 border border-grey p-3 rounded-md w-28 mb-10">
      <Button
        icon={faBars}
        variant={isViewList ? 'primary' : 'secondary'}
        onClick={() => setViewPreference('list')}
      />
      <Button
        icon={faArrowsLeftRightToLine}
        variant={isViewList ? 'secondary' : 'primary'}
        onClick={() => setViewPreference('carousel')}
      />
    </div>
  )
}
