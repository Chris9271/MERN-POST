import React from 'react';
import {Formik, useField, Form} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import {Redirect, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';
import './SignUp.css';

const SignUp = () => {
    // const [isLoginMode, setIsLoginMode] = useState(false);

    // useSelector can extract data from redux store state
    const {isLogin, isLoginMode} = useSelector(state => state);
    // useDispatch return the reference to dispatch function from redux store
    // can used to dispatch action
    const dispatch = useDispatch();
    const handleSwitchLogin = () => dispatch({type: "SWITCH"});
    const authNewUser = async(newUser) => {
        if(!isLoginMode){
            try{
                const addUser = await axios.post('http://localhost:5000/sign', newUser)
                console.log(addUser);
                dispatch({type: "LOGIN", payload: addUser._id})
            }catch(err){
                console.log(err)
            }
        }else{
            try{
                const loginUser = await axios.post('http://localhost:5000/login', newUser)
                console.log(loginUser);
                dispatch({type: "LOGIN", payload: loginUser._id})
            }catch(err){
                console.log(err)
            }
        }
    }

    const validationSchema = Yup.object({
        username: Yup.string()
        .min(3, "Username should longer than 3 characters")
        .concat(!isLoginMode ? Yup.string().required("Username is required") : null),
        email: Yup.string()
        .email("Email is in valid")
        .required("Email is required"),
        password: Yup.string()
        .min(8, "Password should longer than 8 characters")
        .required("Password is required")
        // 須符合開頭為A-Z/a-z/0-9/指定符號且後面跟著指定字元
        // *. - ?
        .matches(/^(?=[A-Za-z]*.)(?=\d*.)(?=[!@#$%^&*?]*.)[A-Za-z\d!@#$%^&*?]{8,}$/, "Should longer than 8 characters"),
        confirmPassword: Yup.string()
        // oneof 內須為數組, 此值被加入白名單
        // ref - 引用password的值
        .oneOf([Yup.ref('password'), null], "Password is not match")
        .concat(!isLoginMode ? Yup.string().required("ConfirmPassword is required") : null)
    })

    const CustomInput = ({label, ...props}) => {
        const [field, meta] = useField(props);
        return(
                <div className="input-field col s12 m8 offset-m2">
                    <input {...field}{...props}/>
                    <label htmlFor={props.name}>{label}</label>
                    {meta.touched && meta.error ? 
                        <span className="helper-text" data-error={meta.error}>{meta.error}</span>
                    : null} 
                </div>
            )
        }

    if(isLogin) return <Redirect to="/"/>

    return (
        <div className="sign-form">
            <h4 className="form-title">{!isLoginMode ? "Sign Up" : "Sign In"}</h4>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(values, {resetForm, submitForm, setSubmitting}) => {
                    setSubmitting(false);
                    resetForm();
                    submitForm();
                    authNewUser(values)
                }}
            >
            {(props) => {
                return(
                    <div className="row">
                        <div className="form-wrapper input-field col s12 m8 offset-m2">
                        <Form>
                            {!isLoginMode ? 
                                <CustomInput 
                                    label="UserName"
                                    type="text" 
                                    name="username"
                                />
                            : null}
                            <CustomInput
                                label="Email Address"
                                type="email"
                                name="email"
                            />
                            <CustomInput
                                label="Password"
                                type="password"
                                name="password"
                            />
                            {!isLoginMode ? 
                                <CustomInput
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                /> 
                            : null}
                            <div className="col s12 m8 offset-m2">
                                <button 
                                    type="submit"
                                    className="waves-effect waves-light btn"
                                    disabled={!!props.isSubmitting}
                                    >
                                    {props.isSubmitting ? "Loading..." : "Submit"}
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </Form>
                            <div className="switch-area">
                                <h5>{!isLoginMode ? "Already Register?" : "Don't have an account?"}</h5>
                                {isLoginMode ? 
                                <Link to="/sign">
                                    <button className="switchMode" onClick={handleSwitchLogin}>Switch To SignUp</button>
                                </Link>
                                :
                                <Link to="/login">
                                    <button className="switchMode" onClick={handleSwitchLogin}>Switch To SignIn</button>
                                </Link> 
                                }
                            </div>
                        </div>
                    </div>
                )
            }}
            </Formik>
        </div>
    )
}

export default SignUp;
