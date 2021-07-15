import styles from '../styles/misc.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

const IconList = (props)=>{
    let options_ref = useRef(null);
    return (
        <div className={styles['icon-tool']}>
            {props.label ? <span>{props.label}</span> : <span></span>}
            <div tabIndex={1}>
                <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>
                <ul ref={options_ref} >
                    {props.children}
                </ul>
            </div>
        </div>
    )
}

export default IconList;