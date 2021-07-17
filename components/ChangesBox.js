import IconList from './IconList';
import styles from '../styles/dashboard.module.scss';
import { faEllipsisV, faCodeBranch } from '@fortawesome/free-solid-svg-icons';

const __COMMITED__ = 2;
const __NORMAL__ = 1;
const __UNCOMMITED__ = 0;

const ContribUsers = (props)=>{

    return (<div className={styles["change-users"]}>
        {
            props.allUsers.map((user , index)=>{
                if(index === 0) 
                {return <span className={styles["assigner"]}>{user}</span>}
                else if(index === 1)
                {return <span>{user}</span>}
            })
            
        }
        {
            
            props.allUsers.length > 2 ? <IconList size={"0.9rem"} icon={faCodeBranch} label={`+${props.allUsers.length - 2} More`}  fontWeight={500}>
                {props.allUsers.map((user , index)=>{
                    if(index > 1){
                        return <li>{user}</li>
                    }
                })}
            </IconList> : null
        }
    </div>);
}

const ChangeItem = (props)=>{
    return (
        <li className={styles["change"]}>
            <div className={styles["change-title"]}>
                <h2>Change Name goes here and can be this long.</h2>
                <IconList icon={faEllipsisV} size={"1.2rem"}>
                    <li>Mark Commmited</li>
                    <li>Mark Completed</li>
                    <li>Close Change</li>
                    <li>View Queries</li>
                    <li>Extend Deadline</li>
                    <li class="special">Delete</li>
                </IconList>
            </div>
            <div className={styles["change-tags"]}>
                <span type={__UNCOMMITED__}>Closed</span>
                <span type={__COMMITED__}>Committed</span>
            </div>
            <p>Add Undo feature that allows users to control the changes that they may have accidentally made. Undo Stack should be 10 levels deep.</p>
            <ContribUsers allUsers={
                [
                    'Abhishek Jha',
                    'Ayansha Jha',

                ]
            }/>
            
        </li>
    )
}


const ChangesBox = (props)=>{
    return (
        <div className={styles["changes-box"]}>
            <div className={styles["box-title"]}>
                <h2>{props.title || 'Changes'}</h2>
                {props.children}
            </div>
            <ul className={styles["changes-inner-box"]}>
                <ChangeItem/>
                <ChangeItem/>
            </ul>
        </div>
    )
}

export default ChangesBox;