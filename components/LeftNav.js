import { useEffect , useState } from 'react';
import styles from '../styles/dashboard.module.scss';

const LeftNav = (props)=>{
    const [selected , set_selected] = useState("no-id");
    useEffect(()=>{
        const default_project_data_string = localStorage.getItem('user-specific');
        if(default_project_data_string){
            const default_project_id = JSON.stringify(default_project_data_string).defaultProjectId;
            if(default_project_id){
                set_selected(default_project_id);
            }
        }
    },[])
    return <div className={styles['left-nav']}>
        <h2>PROJECTS</h2>
        <ul>
            {props.projects.map((project) => {
                if(selected === project.id){
                    <li className={styles['selected']}>{project.projectName}</li>
                }
                else{
                    <li>{project.projectName}</li>
                }
            })}
            <li className={styles.last}>Add New Project</li>
        </ul>
    </div>
}

export default LeftNav;
