import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/dashboard.module.scss';
import { faCog } from '@fortawesome/free-solid-svg-icons';
function ProjectBar(){
    return (
        <div className={styles['project-bar']}>
            <div className={styles['project-options']}>
                <span>Project Name</span>
                <i><FontAwesomeIcon icon={faCog}></FontAwesomeIcon>Settings</i>
                <i><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>Open Github Repo</i>
            </div>
            <div className={styles['filter-button']}>
                <span>Filter Changes By</span>
                <button>Pending</button>
            </div>
        </div>
    )
}

export default ProjectBar;