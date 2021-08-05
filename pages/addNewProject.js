import FormWrapper , {RadioButtonComponent, SearchWithComboBox, SimpleInputElement, SimpleTextAreaElement, TextAreaElement} from "../components/FormComponents";
import { supabase } from "../js/supabase";
import { checkForCookies } from "../libs/middleware";
import styles from '../styles/form.module.scss';


const addNewProject = (props)=>{
    return(
        <div className={styles['form-wrapper']}>
            <h2>Add New Project</h2>
            <FormWrapper >
                <SimpleInputElement 
                keyName={'projectName'} 
                label={'Enter Project Title'}
                isRequired={true}
                validityChecker={(value)=>{
                    if(value.length > 8){
                        return 'Maximum 8 characters allowed'
                    }
                    return null;
                }}/>
                <SimpleTextAreaElement
                keyName={'projectDesc'}
                label={'Enter Project Description'}
                isRequired={true}
                validityChecker={(value)=>{
                    if(value.length > 150){
                        return 'Maximum 150 characters allowed'
                    }
                    return null;
                }}/>
                <SimpleInputElement
                keyName={'githubURL'}
                label={'Link To Github Repo'}
                isURL={true}
                ></SimpleInputElement>
                <RadioButtonComponent label={"Is this a personal Project ?"} keyName={'options'} options={
                    [
                        "Yes" , "No"
                    ]
                }/>
                <SearchWithComboBox
                label={"Add Team Members To Your Project."} 
                displayProp="username"
                visibleToggle={['options','No']}
                keyName="contributors"
                type="Array"
                isRequired={true}
                getDataFromQuery = {async (query_string)=>{
                    const db_response = await supabase.from('users').select('*').ilike('username','%'+query_string+'%').neq('id',props.user.id);
                    if(db_response.data === null){
                        return [];
                    }
                    else{
                        return db_response.data;
                    }
                }}
                />
            </FormWrapper>
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