import styles from '../styles/dashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft , faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const DateSelector = ()=>{
    return (
    <div className={styles['date-container']}>
        <FontAwesomeIcon icon={faArrowCircleLeft}/>
        <div>
            <span>Today</span>
            <h1>26th August 2021</h1>
        </div>
        <FontAwesomeIcon icon={faArrowCircleRight}/>
        <div className={styles['icon-with-label']}>
            <FontAwesomeIcon icon={faClock}/>
            <span>Timeline</span>
        </div>
    </div>);
}

export default DateSelector;