import { faCaretDown, faExclamationCircle, faLeaf, faSearch, faSpinner, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useEffect , useContext , useState } from 'react';
import styles from '../styles/form.module.scss';

const FormContext = React.createContext();

/*
    props.maxLength : maximum length of input
    props.isEmail : the string type is email
    props.isRequired : is the element value required

*/

const FormWrapper = (props)=>{

    const [form_data , set_form_data] = useState({});
    useEffect(()=>{
        let new_form_data = {};
        let children;
        if(!props.children.length){
            children = [props.children]
        }
        else{
            children = Array.from(props.children);
        }
        children.map((child)=>{
            if(child.props.keyName){
                new_form_data[child.props.keyName] = {
                    value : '',
                    errorString : child.props.isRequired === true ? 'This field is required' : null
                };
            }
            else{
                console.error('you need to add a keyname prop so that it can be added to the form context');
            }
        })
        set_form_data(new_form_data);
    },[])

    return (
        <form className={styles['form']}>
            <FormContext.Provider value={[form_data , set_form_data]}>
                {props.children}
                <button>Let's get Started</button>
            </FormContext.Provider>
        </form>
    )
}

function combineFunctions(value , validityFunction ,...functions){
    for(const function_unit of functions){
        const [proceed , new_value] = function_unit(value);
        if(!proceed){
           return new_value; 
        }
        value = new_value;
    }
    return validityFunction(value);
}



class FormComponent extends React.Component{
    constructor(props){
        super(props);
        if(props.visibleToggle){
            this.state = {
                visible : false
            }
        }
        else{
            this.state = {
                visible : true
            }
        }
    }

   componentDidUpdate(prevProps , prevState){
        const [context , set_context] = this.context;
        let visible = false;
        if(this.props.visibleToggle){
            const [keyName , optionValue] = this.props.visibleToggle;
            if(context[keyName].value === optionValue){
                visible = true; 
            }
            else{
                visible = false;
            }
        }
        else{
            visible = true;
        }
        if(prevState.visible !== visible){
            this.setState({
                visible
            });
        }
   }
    
    fieldIsRequiredCheck(new_value){
        if(this.props.isRequired && this.props.isRequired === true){
            if(new_value.trim() === ''){
                return [false , 'Empty Field is not allowed'];
            } 
        }
        return [true , new_value];
    }


    changeValue(new_value){
        const [context , setContext] = this.context;
        let new_object = {...context};
        if(!this.props.validityChecker){
            new_object[this.props.keyName] = {
                errorString : null,
                value : new_value
            }
            setContext(new_object);
            return;
        }
        const error_string = combineFunctions(new_value , this.props.validityChecker.bind(this) , this.fieldIsRequiredCheck.bind(this) );
        if(error_string){
            new_object[this.props.keyName]={
                errorString : error_string,
                value : new_value
            };
        }
        else{
            new_object[this.props.keyName]={
                errorString : null,
                value : new_value
            };
        }
        setContext(new_object);
    }

    getValue(){
        const [context ,] = this.context;
        if(context[this.props.keyName]){
            return context[this.props.keyName].value;
        }
        return '';
    }

    getError(){
        const [context , ] = this.context;
        if(context[this.props.keyName]){
            return context[this.props.keyName].errorString;
        }
        return null;
    }


    render(){
        return null;
    }
}

class SimpleInputElement extends FormComponent{
   static contextType = FormContext;
   constructor(props){
       super(props);
   }

   render(){
       if(this.state.visible){
           return (
               <div className={styles['input-group']}>
                    <label>{this.props.label || 'no label provided'}</label>
                    <input type="text" value={this.getValue()} error={this.getError() === null ? "0" : "1"} onChange={(e)=>{
                        this.changeValue(e.target.value);
                    }}/>
                    <i className={styles['error-footer']} error={this.getError() === null ? "0" : "1"}>{this.getError()}</i>
                </div>
                )
            }
        else{
            return null;
        }
    }
}

class SimpleTextAreaElement extends FormComponent{
    static contextType = FormContext;
    constructor(props){
        super(props);
        this.textarea_ref = React.createRef(null);
    }
    render(){
            if(this.state.visible){
                return (<div className={styles['input-group']} >
                    <label>{this.props.label || 'no label provided'}</label>
                    <textarea className={styles['div-textarea']} ref={this.textarea_ref} error={this.getError() === null ? "0" : "1"}  onChange={(e)=>{
                        this.changeValue(e.target.value);
                    }}></textarea>
                    <i className={styles['error-footer']} error={this.getError() === null ? "0" : "1"}>{this.getError()}</i>
                </div>)
            }
            else{
                return null;
            }
    }
}

class RadioButtonComponent extends FormComponent{
    static contextType = FormContext;
    constructor(props){
        super(props);
    }
    render(){
        if(this.state.visible){
                return(
                <div className={styles['input-group']}>
                    <label>{this.props.label || 'no label required'}</label>
                    <div className={styles['radio-btn-option-wrapper']}>
                        {this.props.options.map((option , index)=>{
                            return <div className={styles['radio-btn-option']} key={index}>
                                <input type="radio" 
                                id={this.props.keyName.concat('-',option)} 
                                value={option} 
                                name={this.props.keyName}
                                onChange={(e)=>{
                                    this.changeValue(e.target.value);
                                }}
                                />
                                <label htmlFor={this.props.keyName.concat('-',option)}>{option}</label>
                            </div>
                        })}
                    </div>
                </div>
            )
        }
        else{
            return null;
        }
    }
}

function checkForAttrMatch(array , optionName , optionValue){
    if(array.filter((element)=>element[optionName] === optionValue).length > 0){
        return true;
    }
    return false;
}

class SearchWithComboBox extends FormComponent{
    static contextType = FormContext;

    constructor(props){
        super(props);
        this.state = {...this.state , addedValues:[] , queryResults:[] , loading:false}
        this.search_input_ref = React.createRef(null);
    }

    render(){
        if(this.state.visible){
        return(
            <div className={styles['input-group']}>
                <label>{this.props.label || 'Label not assigned'}</label>
                <div className={styles['input-with-search']}>
                    <input type="text" ref={this.search_input_ref} placeholder={"Start searching for names ..."}/>
                    <i onClick={async ()=>{
                        if(this.props.getDataFromQuery){
                            this.setState({
                                ...this.state , loading : true
                            })
                            const queryResults = await this.props.getDataFromQuery(this.search_input_ref.current.value);
                            this.setState({
                                ...this.state , queryResults , loading : false
                            })
                        }
                        else{
                            console.error("getDataFromQuery function missing");
                        }
                    }}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></i>
                </div>
                <div className={styles['search-results']}>
                    {
                    this.state.queryResults.length > 0 ? <div className={styles['search-results-list']}>
                        {this.state.queryResults.map((query_result)=>{
                            return <span>{query_result[this.props.displayProp]}
                            {checkForAttrMatch(this.state.addedValues , 'id' , query_result.id) ? null : <i onClick={()=>{
                                this.setState({
                                    ...this.state , addedValues : [...this.state.addedValues , query_result]
                                })
                            }}>Add</i>
                            }</span>
                        })}
                    </div> : null
                    }
                    {this.state.queryResults.length === 0 && this.state.loading === true ? 
                    <div className={styles['search-results-loading']}>
                        <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon> 
                    </div>: null
                    }
                    {this.state.queryResults.length === 0 && this.state.loading === false ?
                    <div className={styles['search-results-loading']}>
                        Search Results will appear here , after you press the search button.
                    </div>
                    :null
                    }
                </div>
                <div className={styles['items-selected']}>
                    {this.state.addedValues.map((value)=>{
                        return <span onClick={()=>{
                            this.setState({
                                ...this.state , addedValues : this.state.addedValues.filter((user)=>user.id !== value.id)
                            })
                        }}>{value[this.props.displayProp]}<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></span>
                    })}
                </div>
            </div>
        )
        }
        else {
            return null;
        }
    }
}
    
export default FormWrapper;
export { FormComponent , SimpleInputElement , SimpleTextAreaElement , RadioButtonComponent , SearchWithComboBox};