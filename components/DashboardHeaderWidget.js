import styles from '../styles/dashboard.module.scss';
import Link from 'next/link';

const ChangeStatBlock = (props)=>{
    return(
        <div className={styles['change-stat-block']}>
            <i>{props.changesCount}</i>
            {props.changesLabel}<br/>
            Changes
        </div>
    )
}

const DashboardHeaderWidget = (props)=>{
    return(
        <div className={styles['dashboard-head-wrapper']}>
            <div className={styles['dashboard-date']}>
                <h2>Today</h2>
                <h1>26<sup>th</sup> August 2021</h1>
                <Link href={"#"}>View Project Timeline</Link>
            </div>
            <div className={styles['dashboard-stats-wrapper']}>
                <div className={styles['dashboard-stats']}>
                    <ChangeStatBlock changesCount={"04"} changesLabel={"Completed"}/>
                    <ChangeStatBlock changesCount={"23"} changesLabel={"New"}/>
                </div>
                <span>out of {"43"} total Changes</span>
            </div>
        </div>
    )
}

export default DashboardHeaderWidget;