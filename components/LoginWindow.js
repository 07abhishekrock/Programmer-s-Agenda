import styles from '../styles/login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { supabase } from '../public/js/supabase';


const LoginWindow = (props)=>{
    return <div className={styles['login-window']}>
        <h1 className="main-logo">PROGRAMMER'S<br/><i>AGENDA</i></h1>
        <span>The ToDo For Programmers.</span>
        <button onClick={
            async ()=>{
                const {user , session , error} = await supabase.auth.signIn({
                    provider : 'github'
                });
            }
        }><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>&nbsp;&nbsp;Login With Github</button>
    </div>
}



export default LoginWindow;
