import React from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, SignInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component'
import './sign-in-form.style.scss';
import Button from '../button/button.component'


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    const resetFormFields =() => {
        setFormFields(defaultFormFields);
    }

    const SignInWithGoogle = async() => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handelSubmit = async (event) => {
        event.preventDefault();

        try{

            const response = await SignInAuthUserWithEmailAndPassword(email,password);
            console.log(response);
            
            resetFormFields();
             
        }catch(error){
            if(error.code ==="auth/wrong-password"){
                alert("Incorrect Password");
            }
            else if(error.code ==="auth/user-not-found"){
                alert("Incorrect Email");
            }
            
             //console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name,value} = event.target;
        setFormFields({...formFields,[name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an Account!</h2>
            <span>Sign In with Email and Password</span>
            <form onSubmit={handelSubmit}>
                
                
                <FormInput type="email" label="Email" required onChange={handleChange} name="email" value={email}/>

                
                <FormInput type="password" label="Password" required onChange={handleChange} name="password" value={password}/>

                <div className="buttons-container">
                    
                <Button type="submit">Sign In</Button>
                <Button type="button" buttonType="google" onClick={SignInWithGoogle}>Google Sign In</Button>
                </div>
                
            </form>
        </div>
    );
};

export default SignInForm;