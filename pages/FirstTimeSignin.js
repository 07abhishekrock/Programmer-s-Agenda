import FormWrapper, { ComboBox, InputTextElement, RadioButtonElement } from "../components/FormComponents"
import styles from '../styles/form.module.scss';


const YesNoOptions = [
    {
        optionValue : '1',
        optionLabel : 'Yes'
    },
    {
        optionValue : '0',
        optionLabel : 'No'
    }
]


const FirstTimeSignin = (props)=>{
    return(
        <div className={styles['form-wrapper']}>
            <h2>Tell Us About Yourself.</h2>
            <FormWrapper>
                <InputTextElement keyName="name" label="Your Name is" isRequired={true}/>
                <InputTextElement keyName="lang_name" label="Your Favourite Programming Language" isRequired={true}/>
                <RadioButtonElement
                label="Do You Like Mechanical Keyboards ??"
                keyName="likeMechanicalKeyboards" options={
                    YesNoOptions
                } isRequired={true}></RadioButtonElement>
                {/* <ComboBox></ComboBox> */}
            </FormWrapper>
        </div>
    )
}



export default FirstTimeSignin;