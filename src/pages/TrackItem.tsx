import clsx from "clsx";
import fTrackItem from "../bll/fTrackItem";
import styles from "./trackItem.module.css"

export type TrackItemProps = {
  id: string | null | number;
  title: string | null | undefined;
  audio: string | undefined;
  ramkaProps: string | number | null;
//   setRamkaParent: () => void;
  onSelect: (id: string | null | number) => void;
  // setRamkaParent: (id: string | null | undefined) => void
  isSelected: boolean
}

const TrackItem: React.FC<TrackItemProps> = (props) => {
//   const handleClick = () => props.onSelect?.(props.id)
  // const handleClick = () => props.onSelect(props.id)
  const handleClick = fTrackItem(props)
  const className = clsx({[styles.osnovnajaRamka]: true, [styles.activeRamka]: props.isSelected})
  return(
    // <div style={props.id === props.ramkaProps ? {border: '2px solid green'} : {border: 'none'} }>
    //  <div style={props.isSelected ? {border: '2px solid green'} : {border: 'none'} }>
      // <div className={props.isSelected ? styles.activeRamka : styles.osnovnajaRamka}>
      // <div className={props.isSelected ? `${styles.osnovnajaRamka} ${styles.activeRamka}` : styles.osnovnajaRamka}>
      // Вариант присвоения стилей через классы с clsx:
      <div className={className}>
        <h3 onClick = {handleClick} style={{cursor: 'pointer'}}>{props.title}</h3>
        {/* <h3 onClick = {props.setRamkaParent} style={{cursor: 'pointer'}}>{props.title}</h3> */}
        <audio src={props.audio} controls/>
    </div>
  )
}
export default TrackItem