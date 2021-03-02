import { React, useState } from 'react';

import { Grommet, Box, Button, Form, FormField, TextInput, MaskedInput } from 'grommet';

export default function SignUpForm(props) {

    const customTheme = {
        tab: {
            extend: {
                // width: '50%'
            }
        },
        tabs: {
            header: {
                background: 'red'
            },
            panel: {
                extend: {
                    width: '50%'
                }
            }
        }
    }

    const [signUpFormState, setSignUpFormState] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const handleInput = (event) => {
        setSignUpFormState({...signUpFormState, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        console.log(event.value);
        props.setUserState({...signUpFormState, isSignedIn: true});
        setSignUpFormState({
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: ''
        });
    }

    const validateInput = (validationResults) => {
        console.log(validationResults);

    }

    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.'
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email.toLowerCase())) {
            return 'Invalid email';
        }
    }

    return (
        <Grommet theme={customTheme}>
        <Form onSubmit={handleSubmit} value={signUpFormState}>
            <FormField name='username' htmlFor='sign-up-username' label='Username' required>
                <TextInput
                    id='sign-up-username'
                    name='username'
                    onChange={handleInput}
                    value={signUpFormState.username}
                    placeholder='Username' />
            </FormField>
                <FormField name='firstname' htmlFor='sign-up-firstname' label='First Name' required>
                <TextInput
                    id='sign-up-firstname'
                    name='firstname'
                    placeholder="i.e., John"
                    onChange={handleInput}
                    value={signUpFormState.firstname} />
            </FormField>
            <FormField name='lastname' htmlFor='sign-up-lastname' label='Last Name' required>
                <TextInput
                    id='sign-up-lastname'
                    name='lastname'
                    placeholder="i.e., Doe"
                    onChange={handleInput}
                    value={signUpFormState.lastname} />
            </FormField>
            <FormField required validate={validateEmail} 
                name='email' 
                htmlFor='sign-up-email' 
                label='Email'>
                <MaskedInput 
                    name='email' 
                    onChange={handleInput} 
                    value={signUpFormState.email} 
                    mask={[
                        { regexp: /^[\w\-_.]+$/, placeholder: 'example' },
                        { fixed: '@' },
                        { regexp: /^[\w]+$/, placeholder: 'my' },
                        { fixed: '.' },
                        { regexp: /^[\w]+$/, placeholder: 'com' },
                    ]}/>
            </FormField>
            <FormField required validate={validatePassword} 
                name='password' 
                htmlFor='password' 
                label='Password'>
                <TextInput
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Must be at least 8 characters long.'
                    onChange={handleInput}
                    value={signUpFormState.password} />
            </FormField>
            <Button type='submit' label='Sign In' />
        </Form>
        </Grommet>
    )
}
