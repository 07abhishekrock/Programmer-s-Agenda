import IconList from "./IconList"
import styles from '../styles/navbar.module.scss';
import MainLogo from "./MainLogo";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props)=>{
   return(
       <nav className={styles.navbar}>
           <MainLogo align="left"/>
           <IconList label="Username" icon={faUserCircle}>
               <li>View Profile</li>
               <li>Logout</li>
           </IconList>
       </nav>
   ) 
}

export default Navbar;