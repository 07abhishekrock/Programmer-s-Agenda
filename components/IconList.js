import styles from '../styles/misc.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

const IconList = (props)=>{
    let options_ref = useRef(null);
    return (
        <div className={styles['icon-tool']}>
            {props.label ? <span style={{fontWeight:props.fontWeight}}>{props.label}</span> : <span></span>}
            <div tabIndex={1} style={{width:props.size , height:props.size}}>
                <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
                <ul ref={options_ref} >
                    {props.children}
                </ul>
            </div>
        </div>
    )
}

export default IconList;