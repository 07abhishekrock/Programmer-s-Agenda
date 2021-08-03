import LeftFeatureSlider from "../components/LeftFeatureSlider";
import LoginWindow from "../components/LoginWindow";
import styles from '../styles/login.module.scss';

export default function Login(){
    return(
        <div className={styles['login-wrapper']}>
            <LeftFeatureSlider/>
            <LoginWindow/>
        </div>
    )
}
