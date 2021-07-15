import styles from '../styles/login.module.scss';
import React , {useRef, useState} from 'react';

const features = [
<React.Fragment>Keep Your Projects and Your Calendar Organised</React.Fragment>,
<React.Fragment>Manage Your Projects using Timelines.</React.Fragment>,
<React.Fragment>Work on Multiple Projects at the same time with ease.</React.Fragment>,
]


const LeftFeatureSlider = ()=>{

    let slides_direct_parent_ref = useRef(null);
    let [current_index , set_current_index] = useState(0);
    const changeSlide = (newIndex)=>{
        set_current_index(newIndex);
        Array.from(slides_direct_parent_ref.current.children).forEach((child)=>{
            child.children[0].setAttribute('pseudo',0);
        })
    }
    const pseudoReappear = ()=>{

        Array.from(slides_direct_parent_ref.current.children).forEach((child)=>{
            child.children[0].setAttribute('pseudo',1);
        })
    }

    return(
    <div className={styles['left-feature-window-wrapper']}>
        <div className={styles['left-feature-windows']}  onTransitionEnd={pseudoReappear} ref={slides_direct_parent_ref} style={{transform:`translateX(${-1 * 100 * current_index}%)`}}>
            {features.map((feature , index)=>{
                return <div className={styles['feature-window']} key={index} >
                    <h1>{feature}</h1>
                </div>
            })}
        </div>
        <div className={styles['feature-slider']}>
            {features.map((_,index)=>{
                return <span key={index} select={index === current_index ? 1 : 0} onClick={
                    changeSlide.bind(null , index)
                }></span>
            })}
        </div>
    </div>
    )
}

export default LeftFeatureSlider;