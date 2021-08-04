import DateSelector from "../components/DateSelector";
import ChangesBox from "../components/ChangesBox";
import ProjectRoleBar from "../components/ProjectRoleBar";
import ProjectOverview from "../components/ProjectOverview";
import styles from '../styles/dashboard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { checkForCookies } from "../libs/middleware";

export default function Home(props) {
  return (
    <div className={styles['dashboard-inner']}>
      <DateSelector/>
      <ProjectRoleBar/>
      <div className={styles['dashboard-content']}>
        <ChangesBox title={"Pending Changes"}>
          <button className={styles['filter-btn']}>All Changes</button>
        </ChangesBox>
        <ChangesBox title={"New Changes"}>
          <button className={styles['add-new-change-btn']}>
            <FontAwesomeIcon icon={faPlusCircle}></FontAwesomeIcon>
            &nbsp;Add New Change
          </button>
        </ChangesBox>
        <ProjectOverview/>
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