import styles from '../styles/dashboard.module.scss';
import { checkForCookies } from "../libs/middleware";
import { supabase } from '../js/supabase';
import DashboardHeaderWidget from '../components/DashboardHeaderWidget';
import ProjectBar from '../components/ProjectBar';
import ChangesList from '../components/ChangesList';
import AddNewChange from '../components/AddNewChange';

export default function Home(props) {
  return (
    <div className={styles['dashboard-inner']}>
      <DashboardHeaderWidget/>
      <ProjectBar/>
      <div className={styles['dashboard-changes-list-wrapper']}>
        <ChangesList/>
        <AddNewChange/>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const [cookies_found , data] = checkForCookies(context.req);   
  const db_response = await supabase.from('projects').select('userId').eq('userId',data.id);

  let projects = [];
  if(projects !== null){
      projects = db_response.data;
  }

  if(cookies_found){
    return (
      {
        props : {user : data , projects : projects}
      }
    )
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