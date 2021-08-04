import LeftFeatureSlider from "../components/LeftFeatureSlider";
import LoginWindow from "../components/LoginWindow";
import { checkForCookies } from "../libs/middleware";
import styles from '../styles/login.module.scss';

export default function Login(){
    return(
        <div className={styles['login-wrapper']}>
            <LeftFeatureSlider/>
            <LoginWindow/>
        </div>
    )
}

export async function getServerSideProps(context){
        const [cookies_found , ] = checkForCookies(context.req); 
        if(cookies_found){
            return {
                redirect : {
                    destination : '/',
                    permanent : false
                }
            }
        }
        else{
            return ({
                props : {} 
            })
        }
}
