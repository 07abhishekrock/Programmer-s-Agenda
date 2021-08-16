import { faCheckCircle, faCodeBranch, faEllipsisV, faExclamationCircle, faStream } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HoverList } from "./IconList";
import styles from '../styles/dashboard.module.scss';
import Link from 'next/link';

const __ASSIGNED__ = 0;
const __IMPLEMENTED__ = 1;
const __APPROVED__ = 2;
const __COMMITTED__ = 3;


const change1 = {
    title : 'Undo Feature For The Embedded Editor',
    addedOn : "23 August 2020",
    deadlineOn : "25 August 2020",
    changeStatus : __ASSIGNED__,
    contributors : [
        {id : '111' , username : '07abhishekrock' , avatarURL : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'},
        {id : '112' , username : 'ayansharocks' , avatarURL : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'}
    ],
    resources : [
        {linkName : 'user_image.jpg' , linkAddress : '#'},
        {linkName : 'dashboard_design.jpg' , linkAddress : '#'},
    ],
    addedBy : {id : '100' , username : 'leader' , avatarURL : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'},
    changeDesc : "Add Undo feature that allows users to control the changes that they may have accidentally made. Undo Stack should be 10 levels deep."
}

function ChangeBlock(props){
    return <div className={styles['change-block']}>
        <span className={styles['date-added']}>Added On {props.addedOn}
            <i></i><b>Assigned</b>
            <i></i><b>#2019234</b>
        </span>
        <div className={styles['heading-with-options']}>
            <h2>{props.title}</h2>
            <HoverList containsImage={false} icon={faStream}>
                <a>Add Query</a>
                <a>Edit Change</a>
                <a>Delete Change</a>
                <a>Close Change</a>
            </HoverList>
        </div>
        <p>{props.changeDesc}</p>
        <div className={styles['project-sub-heading-block']}>
            <h4>Resources</h4>
            {props.resources.map((resource)=>{
                return <Link href={resource.linkAddress}>{resource.linkName}</Link>
            })}
        </div>
        <div className={styles['bottom-bar']}>
            <div className={styles['project-sub-heading-block']}>
                <h4>Change Progress</h4>
                {/* <span>To Be Implemented</span> */}
                <div className={styles['change-progress']}>
                    <div className={styles['change-checkpoint']} select={"1"}>
                        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                    </div>
                    <div className={styles['change-checkpoint']} select={"1"}>
                        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                    </div>
                    <div className={styles['change-checkpoint']}>
                        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                    </div>
                    <div className={styles['change-checkpoint']}>
                        <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                    </div>
                </div>
                <i><FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon>Assigned on 24th Aug 2020</i>
            </div>
            <div className={styles['contributors']}>
                <span className={styles['main']} style={{backgroundImage : `url(${props.addedBy.avatarURL})`}}></span>
                {props.contributors.map((contributor)=>{
                    return <span style={{backgroundImage : `url(${contributor.avatarURL})`}} key={contributor.id}></span>
                })}
                <span>View All</span>
            </div>
        </div>
    </div>
}

export default function ChangesList(props){
    return (
        <div className={styles['changes-list']}>
            <ChangeBlock {...change1}/>
            <ChangeBlock {...change1}/>
            <ChangeBlock {...change1}/>
        </div>
    )
}