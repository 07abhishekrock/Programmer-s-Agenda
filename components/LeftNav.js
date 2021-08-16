import { useEffect , useState , useRef } from 'react';
import styles from '../styles/dashboard.module.scss';

const LeftNav = (props)=>{
    const [selected , set_selected] = useState("no-id");
    const [fixed , set_fixed] = useState(0);
    const intersection_ref = useRef(null);
    useEffect(()=>{
        const default_project_data_string = localStorage.getItem('user-specific');
        if(default_project_data_string){
            const default_project_id = JSON.stringify(default_project_data_string).defaultProjectId;
            if(default_project_id){
                set_selected(default_project_id);
            }
        }
        const intersection_object = new IntersectionObserver((entries)=>{
            const entry = entries[0];
            if(entry.isIntersecting){
                set_fixed(0);
            }
            else{
                set_fixed(1);
            }
        }, {
            threshold : [1],
            root : null
        })
        intersection_object.observe(intersection_ref.current);

        return ()=>{
            intersection_object.unobserve(intersection_ref.current);
        }
    },[])
    return <div className={styles['left-nav-wrapper']} >
    <span style={{
        display:'block',
        height:'0.2em'
    }}
    ref={intersection_ref} 
    ></span>
    <div className={styles['left-nav']} fixed={fixed}>
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
    </div>
}

export default LeftNav;
