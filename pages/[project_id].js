import styles from '../styles/dashboard.module.scss';
import { checkForCookies, getAllProjects } from "../libs/middleware";
import DashboardHeaderWidget from '../components/DashboardHeaderWidget';
import ProjectBar from '../components/ProjectBar';
import ChangesList from '../components/ChangesList';
import AddNewChange from '../components/AddNewChange';
import { supabase } from '../js/supabase';

export default function Home(props) {
  return (
    <div className={styles['dashboard-inner']}>
      <DashboardHeaderWidget currentProjectData={props.currentProjectData}/>
      <ProjectBar currentProjectData={props.currentProjectData}/>
      <div className={styles['dashboard-changes-list-wrapper']}>
        <ChangesList/>
        <AddNewChange/>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const [cookies_found , data] = checkForCookies(context.req);   
  
  
  if(cookies_found){
      const projects = await getAllProjects(data , context.req , context.res);

    if(projects.length === 0){
        return (
            {
                redirect : 
                {
                    destination : '/addNewProject',
                    permanent : false
                }
            }
        )
    }

    const target_project_id = context.params.project_id;
    if(projects.map(project => project.id).includes(target_project_id)){
        const {data : currentProjectData , error} = await supabase.from('projects').select().eq('id',target_project_id);
        return (
            {
                props : {
                    currentProject : target_project_id , 
                    currentProjectData : currentProjectData[0],
                    projects,
                    user : data
                }
            }
        )
    }
    else{
        return (
            {
                redirect : {
                    destination : "/noProjectFound",
                    permanent : false
                }
            }
        )
    }

  }
  else{
    return (
      {
        redirect :{
          destination : '/login', 
          permanent : false
        }
      }
    )
  }
}
