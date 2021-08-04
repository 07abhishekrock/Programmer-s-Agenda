import { HoverList } from "./IconList";
import styles from '../styles/navbar.module.scss';
import MainLogo from "./MainLogo";
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props)=>{
   return(
       <nav className={styles.navbar}>
           <MainLogo align="left"/>
           <HoverList label={props.user.username} containsImage={true} image_url={props.user.avatar}>
               <a>View Profile</a>
               <a>Logout</a>
           </HoverList>
       </nav>
   ) 
}

export default Navbar;