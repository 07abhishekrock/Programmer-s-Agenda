import { useEffect , useState } from "react";
import DateSelector from "../components/DateSelector";
import LeftNav from "../components/LeftNav";
import { supabase } from "../public/js/supabase";
import styles from '../styles/dashboard.module.scss';

export default function Home() {
  let [user , setUser] = useState([]);
  useEffect(async ()=>{
    setUser(await supabase.auth.user()); 
  },[])
  return (
    <>
      <div className={styles['dashboard-wrapper']}>
        <LeftNav/>
        <DateSelector/>
      </div>
    </>
  )
}
