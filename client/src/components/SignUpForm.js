import { React, useState } from 'react';

import { Grommet, Box, Text, Button, Form, FormField, TextInput, MaskedInput } from 'grommet';

import API from "../utils/API";

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
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errorState, setErrorState] = useState();

    const handleInput = (event) => {
        setErrorState();
        setSignUpFormState({...signUpFormState, [event.target.name]: event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        API.signUp(signUpFormState).then( (response) => {
            props.setUserState({
                id: response.data.user.id,
                userName: response.data.user.userName,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                email: response.data.user.email,
                isSignedIn: true,
                token: response.data.token
            });
        }).catch( (err) => {
            setErrorState(err);
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
            <FormField name='userName' htmlFor='sign-up-username' label='Username' required>
                <TextInput
                    id='sign-up-username'
                    name='userName'
                    onChange={handleInput}
                    value={signUpFormState.userName}
                    placeholder='Username' />
            </FormField>
            <FormField name='firstName' htmlFor='sign-up-firstname' label='First Name' required>
                <TextInput
                    id='sign-up-firstname'
                    name='firstName'
                    placeholder="i.e., John"
                    onChange={handleInput}
                    value={signUpFormState.firstName} />
            </FormField>
            <FormField name='lastName' htmlFor='sign-up-lastname' label='Last Name' required>
                <TextInput
                    id='sign-up-lastname'
                    name='lastName'
                    placeholder="i.e., Doe"
                    onChange={handleInput}
                    value={signUpFormState.lastName} />
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
            {errorState &&
                (<Box pad='small' margin={{bottom: 'small'}}>
                    <Text color="status-error">{errorState.response.statusText}</Text>
                </Box>)
            }
            <Button type='submit' label='Sign In' />
        </Form>
        </Grommet>
    )
}
