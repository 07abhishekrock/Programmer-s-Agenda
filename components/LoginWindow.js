import styles from '../styles/login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Router from 'next/router';
import { clientId } from '../libs/githubAuth';

const LoginWindow = ()=>{
    return <div className={styles['login-window']}>
        <h1 className="main-logo">PROGRAMMER'S<br/><i>AGENDA</i></h1>
        <span>The ToDo For Programmers.</span>
        <button onClick={
            ()=>{
                Router.push('https://github.com/login/oauth/authorize?client_id='+clientId+'&scope=user');
            }
        }><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>&nbsp;&nbsp;Login With Github</button>
    </div>
}



export default LoginWindow;
