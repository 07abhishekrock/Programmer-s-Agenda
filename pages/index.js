import DateSelector from "../components/DateSelector";
import LeftNav from "../components/LeftNav";
import ChangesBox from "../components/ChangesBox";
import ProjectRoleBar from "../components/ProjectRoleBar";
import ProjectOverview from "../components/ProjectOverview";
import styles from '../styles/dashboard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
const jwt = require('jsonwebtoken');
import { mySecretKey } from "./libs/githubAuth";

export default function Home(props) {
  return (
    <>
    <span>{JSON.stringify(props.user)}</span>
      <div className={styles['dashboard-wrapper']}>
        <LeftNav/>
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
      </div>
    </>
  )
}

export async function getServerSideProps(context){
  try{
    if(context.req.cookies && context.req.cookies.token){
      const token = context.req.cookies.token;
      const decoded = jwt.verify(token , mySecretKey);
      return {
        props : {
          user : decoded
        }
      }
    }
    else{
      throw Error('cookies not found')
    }
  }
  catch(e){
    return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
    }
  }
}