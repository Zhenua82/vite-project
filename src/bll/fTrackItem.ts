import type {TrackItemProps} from '../pages/TrackItem.tsx';
function fTrackItem(props: TrackItemProps){
  const handleClick = () => props.onSelect(props.id)
  return handleClick
}
export default fTrackItem