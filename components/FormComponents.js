import { faCaretDown, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect , useContext , useState } from 'react';
import styles from '../styles/form.module.scss';

const FormDataContext = React.createContext({});
const FormErrorContext = React.createContext();

/*
    props.maxLength : maximum length of input
    props.isEmail : the string type is email
    props.isRequired : is the element value required

*/

const useErrorContext = (props)=>{
    const [error , set_error] = useContext(FormErrorContext);

    const set_local_error_wrapper = (error_data , errorString)=>{
        let obj = {};
        obj[props.keyName] = {
            error : error_data,
            error_string : errorString
        }
        set_error({...error , ...obj})
    }
    return [error , set_error , set_local_error_wrapper];
}



const RadioButtonElement = (props)=>{

    const [data , set_data] = useContext(FormDataContext);
    const [error , set_error , set_local_error_wrapper] = useErrorContext(props);

    return (
        <div className={styles['input-group']}>
            <label>{props.label}</label>
            <div className={styles["radio-btn-option-wrapper"]}>
            {props.options.map((option , index)=>{
                const id_ref = props.keyName.concat('-',option.optionLabel);
                return <div className={styles['radio-btn-option']} key={index}>
                    <input type="radio" name={props.keyName} value={option.optionValue} id={id_ref} onClick={(e)=>{
                        let selected_value = e.target.value;
                        let new_obj = {};
                        new_obj[props.keyName] = selected_value;
                        set_data({...data , ...new_obj})
                    }}/>
                    <label htmlFor={id_ref}>{option.optionLabel}</label>
                </div>
            })}
            </div>
            <i error={error[props.keyName] ? error[props.keyName].error : 0} className={styles['error-footer']}><FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon> {error[props.keyName] ? error[props.keyName].error_string : ''}</i>
        </div>
    )
}

//argument named props.comboOptions
const ComboBox = (props)=>{

    const [data , set_data] = useContext(FormDataContext);
    const [error , set_error , set_local_error_wrapper] = useErrorContext(props);

    return (
        <div className={styles['combo-box-wrapper']}>
            <select style={{
                backgroundColor : 'white',
                width:'100%',
                border:'0px solid black',
                padding:'0.3em 0.5em',
                fontSize : '1.2em'
            }}>
                <option>First</option>
                <option>First</option>
                <option>First</option>
                <option>First</option>
                <option>First</option>
            </select>
            
        </div>
    )

}

const TextAreaElement = (props)=>{

    const [data , set_data] = useContext(FormDataContext);

const [error , set_error , set_local_error_wrapper] = useErrorContext(props);


    return (
        <div className={styles['input-group']}>
            <label htmlFor={props.keyName}>{props.label}</label>
            <div 
                id={props.keyName}
                className={styles['div-textarea']}
                contentEditable={true}
                onChange={(e)=>{
                    let obj = {};
                    if(props.checkValidity){
                        let validity_object = props.checkValidity(e.target.innerText);

                        if(validity_object.hasError === false){
                            set_local_error_wrapper(0 , 'no error');
                        }
                        else{
                            set_local_error_wrapper(1 , validity_object.errorString);
                        }
                    }
                    else{
                        set_local_error_wrapper(0 , 'no error');
                    }
                    obj[props.keyName] = e.target.innerText;
                    set_data({...data , ...obj});
                }}
            ></div>
            <i error={error[props.keyName] ? error[props.keyName].error : 0} className={styles['error-footer']}><FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon> {error[props.keyName] ? error[props.keyName].error_string : ''}</i>
        </div>
    )
}


const InputTextElement = (props)=>{

    const [data , set_data] = useContext(FormDataContext);
    const [error , set_error , set_local_error_wrapper] = useErrorContext(props);


    return (
        <div className={styles['input-group']}>
            <label htmlFor={props.keyName}>{props.label}</label>
            <input 
                id={props.keyName}
                type="text" 
                value={data[props.keyName] || ''} 
                onChange={(e)=>{
                    let obj = {};
                    if(props.checkValidity){
                        let validity_object = props.checkValidity(e.target.value);

                        if(validity_object.hasError === false){
                            set_local_error_wrapper(0 , 'no error');
                        }
                        else{
                            set_local_error_wrapper(1 , validity_object.errorString);
                        }
                    }
                    else{
                        set_local_error_wrapper(0 , 'no error');
                    }
                    obj[props.keyName] = e.target.value;
                    set_data({...data , ...obj});
                }}
            />

            <i error={error[props.keyName] ? error[props.keyName].error : 0} className={styles['error-footer']}><FontAwesomeIcon icon={faExclamationCircle}></FontAwesomeIcon> {error[props.keyName] ? error[props.keyName].error_string :''}</i>
        </div>
    )
}

const FormWrapper = (props)=>{

    const [form_data , set_form_data] = useState({});
    const [error_data , set_error_data] = useState({});

    useEffect(()=>{
        let initial_form_data = {};
        let initial_error_data = {};
        Array.from(props.children).forEach((child)=>{
            initial_form_data[child.props.keyName] = '';
            initial_error_data[child.props.keyName] = {
                error : 0 , 
                errorString : 'no error'
            };
        })

        set_form_data(initial_form_data);
        set_error_data(initial_error_data);
    },[])

    return (
        <form className={styles['form']}>
            <FormDataContext.Provider value={[form_data , set_form_data]}>
                <FormErrorContext.Provider value={[error_data , set_error_data]}>
                    {props.children}
                    <button>Let's get Started</button>
                </FormErrorContext.Provider>
            </FormDataContext.Provider>
        </form>
    )
}

export default FormWrapper;
export { InputTextElement , TextAreaElement , RadioButtonElement , ComboBox };