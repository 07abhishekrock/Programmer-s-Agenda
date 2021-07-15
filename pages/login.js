import LeftFeatureSlider from "../components/LeftFeatureSlider";
import LoginWindow from "../components/LoginWindow";
import styles from '../styles/login.module.scss';
import { useEffect } from "react";
import Router from 'next/router'
import { supabase } from "../public/js/supabase";

export default function Login(){
    useEffect(()=>{
        if(supabase.auth.user()){
            Router.push('/');
        }
        supabase.auth.onAuthStateChange(async (event , session)=>{
          let new_user = await supabase.auth.user();
          if(new_user !== null){
            Router.push('/');
          }
        })
    },[])

    return(
        <div className={styles['login-wrapper']}>
            <LeftFeatureSlider/>
            <LoginWindow/>
        </div>
    )
}
