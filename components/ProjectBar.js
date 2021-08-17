import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import styles from '../styles/dashboard.module.scss';
import { faEye , faCalendarAlt, faCog, faFilter , faSearch, faWrench, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
function ProjectBar(props){
    const router = useRouter();
    return (
        <div className={styles['project-bar']}>
            <span><FontAwesomeIcon icon={faGithub}/></span> 
            <span id="select-date-filter" tabIndex={1} className={styles['date-filter']}>
                <FontAwesomeIcon icon={faCalendarAlt}/>
                <div className={styles['calendar']}>
                    <div className={styles['calendar-head']}>
                        <span>
                            <FontAwesomeIcon icon={faCaretLeft}/>
                            Aug
                            <FontAwesomeIcon icon={faCaretRight}/>
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faCaretLeft}/>
                            2021
                            <FontAwesomeIcon icon={faCaretRight}/>
                        </span>
                    </div>
                    <div className={styles['calendar-grid']}>
                        <span>10</span>
                        <span>11</span>
                        <span>21</span>
                        <span>31</span>
                        <span current={1}>31</span>
                        <span>31</span>
                        <span>31</span>
                        <span>31</span>
                        <span>31</span>
                    </div>
                </div>
            </span>
            <span className={styles['search']} tabIndex={2}>
                <i>
                    Pending
                    <FontAwesomeIcon icon={faSearch}/>
                </i>
                <input type="text" placeholder="Search Here"/> 
            </span>
            <span><FontAwesomeIcon icon={faWrench}/></span>
            <span><FontAwesomeIcon icon={faEye}/></span>
        </div>
    )
}

export default ProjectBar;