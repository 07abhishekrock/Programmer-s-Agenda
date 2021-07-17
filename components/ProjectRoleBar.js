import styles from '../styles/dashboard.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ProjectRoleBar = ()=>{
    return(
        <div className={styles['project-role-bar']}>
            <span className={styles['project-name']}>Project Name</span>
            <Link href="www.github.com">
                <FontAwesomeIcon icon={faGithub}/>
            </Link>
            <span className={styles['project-role']}>You are a <i>Maintainer</i></span>
        </div>
    );
}

export default ProjectRoleBar;