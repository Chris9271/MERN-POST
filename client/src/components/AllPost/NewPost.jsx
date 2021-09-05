import React from 'react';
// useField is a custom React hook that will automagically hook up inputs to Formik
import {Formik, Form, useField} from 'formik';
import * as Yup from 'yup'; // used to validate and parsing value
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import './NewPost.css';

const NewPost = () => {
    let history = useHistory();
    const postSubmitHandler = async(values) => {
        try{
            const afterSubmit = await axios.post('http://localhost:5000', values);
            console.log(afterSubmit)
        }catch(err){
            console.log(err)
        }
        history.push('/');
    }

    const validationSchema = Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        location: Yup.string().required("Location is required"),
        imageUrl: Yup.string().url("URL is in valid").required("ImageURL is required")
    })

    // use custom input property as argument
    const CustomInput = ({label, ...props}) => {
        // useField return an array with 2-3 elements
        // field - FieldInputProps<Value> 利用傳入之name屬性更新指定字段輸入(onChange/ handleChange)
        // meta - FieldMetaProps<Value> 利用傳入之name屬性檢查指定字段是否被訪問過(onBlur/ handleBlur)
        // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
        const [field, meta] = useField(props);
        // console.log("field", field)
        // console.log("meta", meta)
        // console.log(props)
        if(props.name !== "description"){
        return(
            <div className="input-field col s12 m8 offset-m2">
                <input {...field}{...props}/>
                <label htmlFor={props.name}>{label}</label>
                {meta.touched && meta.error ? 
                    <span className="helper-text" data-error={meta.error}>{meta.error}</span>
                : null}
            </div>
        )}else{
            return(
                <div className="input-field col s12 m8 offset-m2">
                    <textarea {...field}{...props}/>
                    <label htmlFor={props.name}>{label}</label>
                    {meta.touched && meta.error ? 
                        <span className="helper-text" data-error={meta.error}>{meta.error}</span>
                    : null}
                </div>
            ) 
        }
    }
    return (
        <div>
            <h4 className="form-title">New Post</h4>
                <Formik
                    initialValues={{
                        title: "",
                        location: "",
                        imageUrl: "",
                        description: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, {resetForm, submitForm, setSubmitting}) => {
                        resetForm(); // 重置/清除表單(因未指定nextState)
                        setSubmitting(false); // 完成提交
                        submitForm(); // 觸發表單提交
                        postSubmitHandler(values);
                    }}
                >
        {(props) => {
            return(
                <div className="row">
                    {/* Form will automatically hooks into Formik's handleSubmit or handleReset */}
                    <Form>
                        <CustomInput
                            label="Title"  
                            name="title"
                            type="text"
                        />
                        <CustomInput
                            label="Location"  
                            name="location"
                            type="text"
                        />
                        <CustomInput
                            label="Image URL"  
                            name="imageUrl"
                            type="text"
                        />
                        <CustomInput
                            label="Description"  
                            name="description"
                            type="text"
                            className="materialize-textarea"
                        />
                        <div className="col s12 m8 offset-m2">
                            {/* isSubmitting按下Submit轉為true,後被setSubmitting設為false */}
                            <button 
                                type="submit"
                                className="waves-effect waves-light btn"
                                disabled={!!props.isSubmitting}
                            >   
                                {props.isSubmitting ? "Loading..." : "Submit"}
                                <i className="material-icons right">
                                    send
                                </i>
                            </button>
                        </div>
                    </Form>
                </div>
            )
        }}
        </Formik>
        </div>
    )
}

export default NewPost;
