import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/dashboard.module.scss';
const ProjectOverview = ()=>{
    let [modal_active_state , set_modal_active_state] = useState(0);
    return (
        <div className={styles['project-overview-wrapper']} active={modal_active_state}>
        <div className={styles['project-overview']}>
            <h2>Stats</h2>
            <div className={styles['project-stats-box']}>
                <span>64<i>Total Proposed Changes</i></span>
                <span>64<i>Total Proposed Changes</i></span>
                <span>64<i>Total Proposed Changes</i></span>
                <span>64<i>Total Proposed Changes</i></span>
                <span>64<i>Total Proposed Changes</i></span>
                <span>64<i>Total Proposed Changes</i></span>
            </div>
            <button>View Project Info</button>
        </div>
        <span onClick={set_modal_active_state.bind(null , (modal_active_state+1)%2 )}><FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon></span>
        </div>
    )
}

export default ProjectOverview;