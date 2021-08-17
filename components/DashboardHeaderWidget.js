import styles from '../styles/dashboard.module.scss';
import Link from 'next/link';
import { convertDateFormat } from '../libs/middleware';

const ChangeStatBlock = (props)=>{
    return(
        <div className={styles['change-stat-block']}>
            <i>{props.changesCount}</i>
            {props.changesLabel}<br/>
            Changes
        </div>
    )
}

const DashboardHeaderWidget = ({currentProjectData})=>{
    return(
        <div className={styles['dashboard-head-wrapper']}>
            <div className={styles['dashboard-date']}>
                <h2>Today</h2>
                <h1>{convertDateFormat(Date.now())}</h1>
                <Link href={"#"}>View Project Timeline</Link>
            </div>
            <div className={styles['dashboard-stats-wrapper']}>
                <div className={styles['dashboard-stats']}>
                    <ChangeStatBlock changesCount={currentProjectData.completedChanges} changesLabel={"Completed"}/>
                    <ChangeStatBlock changesCount={currentProjectData.pendingChanges} changesLabel={"Pending"}/>
                </div>
                <span>out of {currentProjectData.completedChanges + currentProjectData.pendingChanges} total Changes</span>
            </div>
        </div>
    )
}

export default DashboardHeaderWidget;