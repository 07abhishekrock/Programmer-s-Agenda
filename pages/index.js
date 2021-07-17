import { useEffect , useState } from "react";
import DateSelector from "../components/DateSelector";
import LeftNav from "../components/LeftNav";
import ChangesBox from "../components/ChangesBox";
import ProjectRoleBar from "../components/ProjectRoleBar";
import ProjectOverview from "../components/ProjectOverview";
import { supabase } from "../public/js/supabase";
import styles from '../styles/dashboard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  let [user , setUser] = useState([]);
  useEffect(async ()=>{
    setUser(await supabase.auth.user()); 
  },[])
  return (
    <>
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
