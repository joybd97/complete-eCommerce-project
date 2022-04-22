import React from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component'
import './sign-up-form.style.scss';
import Button from '../button/button.component'

import { UserContext } from '../../context/user.context';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {displayName,email,password,confirmPassword} = formFields;

    const resetFormFields =() => {
        setFormFields(defaultFormFields);
    }

    const handelSubmit = async (event) => {
        event.preventDefault();

        if(password != confirmPassword){
            alert("Password do not match!");
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user,{displayName});
            resetFormFields();
             
        }catch(error){
            if(error.code==='auth/email-already-in-use'){
                alert("Email already in use");
            }
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an Account!</h2>
            <span>Sign Up with Email and Password</span>
            <form onSubmit={handelSubmit}>
                
                <FormInput type="text" label="Display Name" required onChange={handleChange} name="displayName" value={displayName}/>

                
                <FormInput type="email" label="Email" required onChange={handleChange} name="email" value={email}/>

                
                <FormInput type="password" label="Password" required onChange={handleChange} name="password" value={password}/>

                
                <FormInput type="password"label="Confirm Password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;