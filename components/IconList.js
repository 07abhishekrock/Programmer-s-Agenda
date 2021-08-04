import styles from '../styles/misc.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useReducer, useRef } from 'react';

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

export const HoverList = (props)=>{
    const view_reducer = (state, action)=>{
        switch(action){
            case 'view' : return {display : 'initial'};break;
            case 'hide' : return {display : 'none'};break;
        }
    }
    const [view_state, dispatch] = useReducer(view_reducer , {display : 'none'});
    return (
        <div className={styles['hover-list-wrapper']}>
            <span>{props.label} {props.containsImage === true ? <i style={{backgroundImage : `url(${props.image_url})`}}></i> : <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon>}</span>
            <div className={styles['touch-area']} 
            onMouseEnter={()=>{
                dispatch('view');
            }}
            onMouseLeave={()=>{
                dispatch('hide');
            }}
            ></div>
            <div className={styles['list-box']}
            onMouseEnter={()=>{
                dispatch('view');
            }}
            onMouseLeave={()=>{
                dispatch('hide');
            }}
            style={{display : view_state.display}}>
                {props.children}
            </div>
        </div>
    )
}

export default IconList;