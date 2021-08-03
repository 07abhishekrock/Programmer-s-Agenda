import FormWrapper , {InputTextElement , TextAreaElement} from "../components/FormComponents";
import styles from '../styles/form.module.scss';


const addNewProject = ()=>{
    return(
        <div className={styles['form-wrapper']}>
            <h2>Add New Project</h2>
            <FormWrapper>
                <InputTextElement label="Your Project Name" keyName="projectName" isRequired={true}/>
                <TextAreaElement label="Tell us something about your project" keyName="projectDesc" isRequired={true}></TextAreaElement>
                <InputTextElement label="Add a Github Repo" keyName="githubRepoLink"/>
                <InputTextElement label="Target Audience" keyName="targetAudience"/>
            </FormWrapper>
        </div>
    );
}

export default addNewProject;