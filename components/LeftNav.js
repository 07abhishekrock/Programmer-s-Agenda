import { useEffect , useState , useRef } from 'react';
import styles from '../styles/dashboard.module.scss';

const LeftNav = (props)=>{
    const [fixed , set_fixed] = useState(0);
    const intersection_ref = useRef(null);
    const selected = props.currentProject;


    useEffect(()=>{
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
                   return  <li className={styles['selected']} key={project.id}>
                       {project.projectName}
                   </li>
                }
                else{
                    return <li key={project.id}>{project.projectName}</li>
                }
            })}
            <li className={styles.last}>Add New Project</li>
        </ul>
    </div>
    </div>
}

export default LeftNav;
