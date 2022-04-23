import React from 'react';
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, SignInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component'
import './sign-in-form.style.scss';
import Button from '../button/button.component';

//import {UserContext} from '../../context/user.context';


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields,setFormFields] = useState(defaultFormFields);
    const {email,password} = formFields;

    //const {setCurrentUser} = useContext(UserContext);

    const resetFormFields =() => {
        setFormFields(defaultFormFields);
    }

    const SignInWithGoogle = async() => {
          await signInWithGooglePopup();
         
    }

    const handelSubmit = async (event) => {
        event.preventDefault();

        try{

            const {user} = await SignInAuthUserWithEmailAndPassword(email,password);
             
           // setCurrentUser(user);
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