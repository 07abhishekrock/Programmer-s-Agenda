import styles from '../styles/dashboard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { checkForCookies } from "../libs/middleware";
import { supabase } from '../js/supabase';

export default function Home(props) {
  return (
    <div className={styles['dashboard-inner']}>
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