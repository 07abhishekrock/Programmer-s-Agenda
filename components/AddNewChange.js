import { faCheckCircle, faExclamationCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/add_new_change.module.scss';
import form_styles from '../styles/form.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

const AddNewChange = ()=>{

    const [resource_error , set_resource_error] = useState(false);

    const flashError = ()=>{
        set_resource_error(true);
        setTimeout(()=>{
            set_resource_error(false);
        },500)
    }

    const form = useFormik({
        initialValues : {
            'changeTitle' : '',
            'changeDesc' : '',
            'resources' : [
                {
                    label : 'New Resource',
                    url : '',
                    resource_id : uuidv4(),
                    inView : true
                }
            ],
        },
        initialStatus : {resources : 'Fill In Values'},
        onSubmit : (values)=>console.log(values)
    });

    function setFieldStatus(field_name , field_value){
        this.setStatus({
            ...form.status , [field_name] : field_value
        });
    }

    const resourceValidator = yup.object(
        {
            label : yup.string().required('Empty Label'),
            url : yup.string().required('Empty URL').url('Invalid URL'),
            inView : yup.bool()
        }
    );
    const hideAllResources = ()=>{
        const removeAllFromView = form.values.resources.map((res)=>{
            res.inView = false;
            return res;
        })
        form.setFieldValue('resources',removeAllFromView);
    }
    const getCurrentResourceIntoView = (id)=>{
        const removeAllFromView = form.values.resources.map((res)=>{
            if(res.resource_id === id){
                res.inView = true;
            }
            else{
                res.inView = false;
            }
            return res;
        })
        form.setFieldValue('resources',removeAllFromView);
        
    }
    const appendEmptyResource = ()=>{
        const removeAllFromView = form.values.resources.map((res)=>{
            res.inView = false;
            return res;
        })
        let resource_array_append_with_empty_resource = [
            ...removeAllFromView,
            {
                label : 'New Resource',
                url : '',
                resource_id : uuidv4(),
                inView : true
            }
        ]
        form.setFieldValue('resources',resource_array_append_with_empty_resource);
        setFieldStatus.bind(form)('resources','Fill In Values');
    }
    const changeResources = (field_name , field_value , resource_id)=>{
        let new_resources = form.values.resources.map((old_resource)=>{
            if(resource_id === old_resource.resource_id){
                const new_resource = {
                    ...old_resource , [field_name] : field_value
                };
                resourceValidator.validate(new_resource)
                .then(()=>{
                    console.log('no error');
                    setFieldStatus.bind(form)('resources' , undefined);
                })
                .catch((e)=>{
                    console.log('error found' , e.message);
                    setFieldStatus.bind(form)('resources' , e.message);
                })
                return new_resource;
            }

            return old_resource;
        });
        form.setFieldValue('resources',new_resources);
    }


    return <div className={styles["add-new-change-wrapper"]}>
        <form className={form_styles['form'] + ' ' + form_styles['add-new-change-form']}>
            <div>
                <label>Change Title</label>
                <input type="text" {...form.getFieldProps('changeTitle')}/>
            </div>
            <div>
                <label>Change Description</label>
                <textarea {...form.getFieldProps('changeDesc')}></textarea>
            </div>
            <div>
                <label>Resources</label>
                <div className={form_styles['dynamic-list']}>
                <div className={form_styles['dynamic-list-headers']}>{
                    form.values.resources.map((resource)=>{
                        return <span onClick={()=>{
                            if(!form.status.resources){
                                getCurrentResourceIntoView(resource.resource_id);
                            }
                            else{
                                flashError();
                            }
                        }} inView={resource.inView ? "1" : "0"}>{resource.label.length < 9 ? resource.label : resource.label.slice(0 , 8) + '...' || <i>No Label</i>}</span>
                    })
                }
                </div>
                {
                    form.values.resources.map((resource)=>{
                        if(resource.inView === true){
                            return <div className={form_styles['dynamic-list-unit']}>
                                <div className={form_styles['dynamic-list-input-group']}>
                                    <label>Label</label>
                                    <input type="text" value={resource.label} onChange={(e)=>{
                                        changeResources('label', e.target.value , resource.resource_id); 
                                    }}/>
                                </div>
                                <div className={form_styles['dynamic-list-input-group']}>
                                    <label>URL</label>
                                    <input type="text" value={resource.url} onChange={(e)=>{
                                        changeResources('url', e.target.value , resource.resource_id); 
                                    }}/>
                                </div>
                                <button onClick={(e)=>{
                                    e.preventDefault();
                                    const target_resource_id = resource.resource_id;
                                    if(!resourceValidator.isValidSync(resource)){
                                        setFieldStatus.bind(form)('resources',undefined);
                                    }
                                    let new_resources = form.values.resources.filter((loop_resource)=>loop_resource.resource_id !== target_resource_id);
                                    form.setFieldValue('resources', new_resources);
                                }}>
                                    <FontAwesomeIcon icon={faTrashAlt}/>
                                    &nbsp;
                                    Delete
                                </button>
                            </div>
                        }
                    })
                }

                <button 
                disabled={!form.status.resources ? "true" : undefined} 
                className={form_styles['seperate']}
                animate={resource_error ? "1" : "0"}
                style={{color : 'red'}}>
                    <FontAwesomeIcon icon={faExclamationCircle}/>
                    &nbsp;{form.status.resources}
                </button>
                <button 
                onClick={(e)=>{
                    e.preventDefault();
                    appendEmptyResource();
                }}
                className={form_styles['seperate']} 
                disabled={form.status.resources ? "true" : undefined}
                >Add One More</button>
                </div>
            </div>
            
            {/* <div>
                <label>Add Contributors</label>
                <div className={form_styles['contributors-wrapper']}>
                    <div className={form_styles['contributors']}>
                        {

                        <div className={form_styles['contributor']}>
                            <div></div>
                            <FontAwesomeIcon icon={faCheckCircle}/>
                        </div>
                        }
                    </div>
                </div>
            </div> */}
            
            <button>Add New Change</button>
            {/* <div style={{width : '100%'}}>{JSON.stringify(form.status)}</div> */}
        </form>
    </div>
}

export default AddNewChange;