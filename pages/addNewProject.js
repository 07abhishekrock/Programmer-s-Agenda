import { useRef , useState } from "react";
import { supabase } from "../js/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faSearch , faSpinner , faTimes } from "@fortawesome/free-solid-svg-icons";
import { checkForCookies } from "../libs/middleware";
import styles from '../styles/form.module.scss';
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as yup from 'yup';


const addNewProject = (props)=>{

    const [loading , set_loading] = useState('idle');

    const [data , set_data] = useState([]);

    const [contributors , set_contributors] = useState([]);

    const form = useFormik({
        initialValues : {
            id : uuidv4(),
            projectName : "",
            projectDesc : "",
            userId : "",
            // contributors : [],
            githubURL : '',
            isPersonal : 'no option',
        }, 
        validationSchema : yup.object({
            id : yup.string().required(),
            projectName : yup.string().required(),
            projectDesc : yup.string().required(),
            userId  : yup.string().required(),
            githubURL : yup.string().url(),
            isPersonal : yup.string().required().oneOf(['Yes' , 'No'] , 'Please Select an Option')
        }),
        onSubmit : (values)=>{
                alert(JSON.stringify(values));
            }
    })

    const loadSearchResults = async ()=>{
        const pattern_string = search_input_ref.current.value.trim();
        if(pattern_string !== ''){
            set_loading('loading');
            const {data , error} = await supabase.from('users').select('id , username').ilike('username',`%${pattern_string}%`).limit(5).neq('id' , props.user.id);
            if(error){
                set_loading('error');
            }
            else if(data.length === 0){
                set_loading('empty');
                set_data(data);
            }
            else if(data){
                set_loading('idle');
                set_data(data);
            }
        }
    }

    const ErrorComponent = ({field_name})=>{
        return <i className={styles['error-footer']} error={form.errors[field_name] ? "1" : "0"}>
            <FontAwesomeIcon icon={faExclamationCircle}/>
            &nbsp;
            {form.errors[field_name]}
        </i>
    }

    const returnErrorPropStruct = (field_name)=>{
        return {
            error : form.errors[field_name] ? "1" : "0"
        }
    }

    const search_input_ref = useRef(null);
    return(
        <div className={styles['form-wrapper']}>
            <h2>Add New Project</h2>
            <form className={styles['form']} onSubmit={
                (e)=>{
                    e.preventDefault();
                    form.submitForm();
                }
            }>
                <div>
                    <label>Enter Project Title</label>
                    <input type="text" 
                    {...form.getFieldProps('projectName')} 
                    {...returnErrorPropStruct('projectName')}/>

                    <ErrorComponent field_name="projectName"/>
                </div>
                <div>
                    <label>Enter Project Description</label>
                    <textarea type="text" {...form.getFieldProps('projectDesc')} 
                    {...returnErrorPropStruct('projectDesc')}></textarea>
                    <ErrorComponent field_name="projectDesc"/>
                </div>
                <div>
                    <label>Github Repo Link (if available)</label>
                    <input type="text" {...form.getFieldProps('githubURL')} 
                    {...returnErrorPropStruct('githubURL')}
                    />
                    <ErrorComponent field_name="githubURL"/>
                </div>
                <div>
                    <label>Is This a Personal Project ??</label>
                    <div className={styles['radio-btn-option-wrapper']}>
                        <div className={styles['radio-btn-option']}>
                            <input type="radio" name="isPersonal" onChange={form.setFieldValue.bind(null , 'isPersonal' , 'Yes')} id={form.values.id + '-' + 'Yes'}/>
                            <label htmlFor={form.values.id + '-' + 'Yes'}>Yes</label>
                        </div>
                        <div className={styles['radio-btn-option']}>
                            <input type="radio" name="isPersonal" onChange={form.setFieldValue.bind(null , 'isPersonal' , 'No')} id={form.values.id + '-' + 'No'}/>
                            <label htmlFor={form.values.id + '-' + 'No'}>No</label>
                        </div>
                        <ErrorComponent field_name="isPersonal"/>
                    </div>
                </div>
                {/* {form.values.isPersonal ? null : <div>
                    <label>Add Project Contributors</label>
                    <div className={styles['input-with-search']}>
                        <input type="text" ref={search_input_ref} placeholder={"Start searching for names ..."} onKeyPress={async (e)=>{
                            if(e.key === 'Enter'){
                                await loadSearchResults();
                            }
                        }}/>
                        <i onClick={loadSearchResults}>
                            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                        </i>
                    </div>
                    <div className={styles['search-results']}>
                        {
                        data && data.length > 0 ? <div className={styles['search-results-list']}>
                            {data.map((user)=>{
                                return <span key={user.id}>{user.username}
                                     <i onClick={()=>{
                                        let new_contributors = contributors.filter((contributor)=>{
                                            return contributor.id !== user.id;
                                        });
                                        if(new_contributors.length === contributors.length){
                                            new_contributors.push(user);
                                        }
                                        set_contributors(new_contributors);
                                    }}>{contributors.filter(contri => contri.id === user.id).length === 0 ? "Add" : "Remove"}</i>
                                </span>
                            })}
                        </div> : null
                        }
                        {data && data.length === 0 && loading === 'loading' ? 
                        <div className={styles['search-results-loading']}>
                            <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon> 
                        </div>: null
                        }
                        {data && data.length === 0 && loading === 'idle' ?
                        <div className={styles['search-results-loading']}>
                            Search Results will appear here , after you press the search button.
                        </div>
                        :null
                        }

                        {data && data.length === 0 && loading === 'empty' ?
                        <div className={styles['search-results-loading']}>
                            No results Found
                        </div>
                        :null
                        }
                    </div>
                    <div className={styles['items-selected']}>
                        {contributors.map((user)=>{
                            return <span key={user.id} onClick={()=>{
                                let new_contributors = contributors.filter((contributor)=>{
                                    return contributor.id !== user.id;
                                });
                                set_contributors(new_contributors);
                            }}>{user.username}<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></span>
                        })}
                    </div>
                </div>} */}
                <button>Let's Get Started</button>
            </form> 
            {/* <div style={{width : '100%'}}>{JSON.stringify(form.values)}</div> */}

        </div>
    );
}

export async function getServerSideProps(context){
    const [cookies_found , data] = checkForCookies(context.req);   
    const db_response = await supabase.from('projects').select('userId').eq('userId',data.id);

    let projects = [];
    if(projects !== null){
        projects = db_response.data;
    }

    if(cookies_found){
        return (
            {
                props : {user : data , projects : projects}
            }
        )
    }
    else{
        return (
            {
                redirect : {
                destination : '/login', 
                permanent : false
                }
            }
        )
    }
}


export default addNewProject;