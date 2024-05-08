import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { UserContext } from '../../contexts/user.context';

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // console.log(formFields); // good for monitoring state fields

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        setCurrentUser(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
            setCurrentUser(user);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('invalid credentials');
                    break;
                case 'auth/user-not-found':
                    alert('invalid credentials');
                    break;
                case 'auth/invalid-login-credentials':
                    alert('invalid credentials');
                    break;
                default:
                    console.log(error);
            }
        };
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value }); // js spread syntax = '...formfields' = { 0: displayName, 1: email, 2: password, 3: confirmPassword }
    };

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span> Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email} />

                <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password} />

                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign in with Google</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;