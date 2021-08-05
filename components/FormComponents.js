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

function enableOrDisableBasedOnVisibleToggle(prevProps, prevState){
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
        if(visible === false){
            let obj = {};
            switch(props.type){
                case 'Array' : 
                    obj[props.keyName] = {value : [] , error : null}
                    break;
                default : 
                    obj[props.keyName] = {value : '' , error : null}
                    break;
            }
            set_context({...context ,
                ...obj
            })
        }
        this.setState({
            visible
        });
    }
}



class FormWrapper extends React.Component{

    constructor(props){
        super(props);
        let new_form_data = {};
        let children;
        if(!props.children.length){
            children = [props.children]
        }
        else{
            children = Array.from(props.children);
        }
        children.map((child)=>{
            let value = '';
            const type = child.props.type || 'String';
            switch(type){
                case 'Array' : 
                value = []
                break;
                default :
                value = ''
                break;
            }
            if(child.props.keyName){
                new_form_data[child.props.keyName] = {
                    value : value,
                    errorString : child.props.isRequired === true ? 'This field is required' : null
                };
            }
            else{
                console.error('you need to add a keyname prop so that it can be added to the form context');
            }
        })
        this.state = {form_data : new_form_data};
    }
    
    set_form_data(new_value){
        this.setState({...this.state , form_data : new_value});
    }

    render(){
        return (
            <form className={styles['form']} onSubmit={(e)=>{
                e.preventDefault();
            }}>
            <FormContext.Provider value={[this.state.form_data , this.set_form_data.bind(this)]}>
                {this.props.children}
                <button>Let's get Started</button>
            </FormContext.Provider>
        </form>
    )
    }
}

function combineFunctions(value , validityFunction ,...functions){
    for(const function_unit of functions){
        console.log(function_unit);
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
        enableOrDisableBasedOnVisibleToggle.apply(this , [prevProps , prevState])
    }

    fieldIsRequiredCheck(new_value){
        if(this.props.isRequired && this.props.isRequired === true){
            if(new_value.length === 0 || (typeof new_value === 'string' && new_value.trim() === '')){
                return [false , 'Empty Field is not allowed'];
            } 
        }
        return [true , new_value];
    }

    fieldIsURLCheck(new_value){
        if(this.props.isURL && this.props.isURL === true){
            if(typeof new_value === 'string'){
                let isURL = new_value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                if(isURL !== null){
                    return [true , new_value];
                }
            }
            return [false , 'Invalid URL provided']
        }
        return [true , new_value]
    }

    readContextValue(){
        const [context , set_context] = this.context;
        const string = (context[this.props.keyName].value);
        return string;
    }

    changeValue(new_value){
        const [context , setContext] = this.context;
        let new_object = {...context};
        const error_string = combineFunctions(new_value , this.props.validityChecker ? this.props.validityChecker.bind(this) : ()=>null , this.fieldIsRequiredCheck.bind(this) , this.fieldIsURLCheck.bind(this));
        if(!this.props.validityChecker){
            new_object[this.props.keyName] = {
                errorString : error_string,
                value : new_value
            }
            setContext(new_object);
        }
        else{
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
        this.state = {...this.state , queryResults:[] , loading:'idle'}
        this.search_input_ref = React.createRef(null);
    }


    async loadSearchResults(){
        if(this.props.getDataFromQuery){
            this.setState({
                ...this.state , loading : 'load'
            })
            const queryResults = await this.props.getDataFromQuery(this.search_input_ref.current.value);
            if(queryResults.length > 0){
                this.setState({
                    ...this.state , queryResults , loading : 'completed' 
                })
            }
            else{
                this.setState({
                    ...this.state, queryResults : [] , loading : 'empty'
                })
            }
        }
        else{
            console.error("getDataFromQuery function missing");
        }
    }


    render(){
        if(this.state.visible){
        return(
            <div className={styles['input-group']}>
                <label>{this.props.label || 'Label not assigned'}</label>
                <div className={styles['input-with-search']}>
                    <input type="text" ref={this.search_input_ref} placeholder={"Start searching for names ..."} onKeyPress={(e)=>{
                        if(e.key === 'Enter'){
                            this.loadSearchResults.bind(this)();
                        }
                    }}/>
                    <i onClick={this.loadSearchResults.bind(this)}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></i>
                </div>
                <div className={styles['search-results']} error={this.getError() === null ? "0" : "1"}>
                    {
                    this.state.queryResults.length > 0 ? <div className={styles['search-results-list']}>
                        {this.state.queryResults.map((query_result)=>{
                            return <span key={query_result.id}>{query_result[this.props.displayProp]}
                            {checkForAttrMatch(this.readContextValue() , 'id' , query_result.id) ? null : 
                            <i onClick={()=>{
                                this.changeValue([...this.readContextValue() , query_result])
                            }}>Add</i>
                            }</span>
                        })}
                    </div> : null
                    }
                    {this.state.queryResults.length === 0 && this.state.loading === 'load' ? 
                    <div className={styles['search-results-loading']}>
                        <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon> 
                    </div>: null
                    }
                    {this.state.queryResults.length === 0 && this.state.loading === 'idle' ?
                    <div className={styles['search-results-loading']}>
                        Search Results will appear here , after you press the search button.
                    </div>
                    :null
                    }

                    {this.state.queryResults.length === 0 && this.state.loading === 'empty' ?
                    <div className={styles['search-results-loading']}>
                        No results Found
                    </div>
                    :null
                    }

                </div>
                <i className={styles['error-footer']} error={this.getError() === null ? "0" : "1"}>{this.getError()}</i>
                <div className={styles['items-selected']}>
                    {this.readContextValue().map((value)=>{
                        return <span key={value.id} onClick={()=>{
                            const added_array = this.readContextValue();
                            this.changeValue(
                                added_array.filter((user)=>user.id !== value.id)
                            )
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