import styles from '../styles/dashboard.module.scss';

const LeftNav = ()=>{
    return <div className={styles['left-nav']}>
        <h2>PROJECTS</h2>
        <ul>
            <li className={styles.selected}>First Project</li>
            <li>Second Project</li>
            <li>Third Project</li>
            <li className={styles.last}>Add New Project</li>
        </ul>
    </div>
}

export default LeftNav;
