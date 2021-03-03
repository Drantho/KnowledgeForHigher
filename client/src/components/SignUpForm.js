import { React, useState } from 'react';

import { Grommet, Box, Text, Button, Form, FormField, TextInput, MaskedInput } from 'grommet';

import API from "../utils/API";

export default function SignUpForm(props) {

    const customTheme = {
        global: {
            colors: {
                focus: {
                    border: undefined
                }
            }
        },
        formField: {
            border: undefined
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
        props.goToSignInTab();
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
                isSignedIn: false,
                token: response.data.token
            });
            props.goToSignInTab();
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
            <FormField required
                margin={{horizontal: '5%'}} 
                width='70%'
                name='userName'
                htmlFor='sign-up-username' 
                label='Username' >
                <TextInput
                    id='sign-up-username'
                    name='userName'
                    onChange={handleInput}
                    value={signUpFormState.userName}
                    placeholder='Username' />
            </FormField>
            <Box direction='row'>
                <FormField required
                    width='40%'  
                    name='firstName' 
                    htmlFor='sign-up-firstname' 
                    label='First Name'
                    margin={{horizontal: '5%'}} >
                    <TextInput
                        id='sign-up-firstname'
                        name='firstName'
                        placeholder="i.e., John"
                        onChange={handleInput}
                        value={signUpFormState.firstName} />
                </FormField>
                <FormField required
                    width='40%'
                    name='firstName'
                    htmlFor='sign-up-firstname'
                    label='Last Name'
                    margin={{ horizontal: '5%' }} >                    
                    <TextInput
                        id='sign-up-lastname'
                        name='lastName'
                        placeholder="i.e., Doe"
                        onChange={handleInput}
                        value={signUpFormState.lastName} />
                </FormField>
            </Box>
            <Box direction='row' margin={{bottom: '20px'}}>
                <FormField required validate={validateEmail} 
                    margin={{ horizontal: '5%' }}
                    width='40%'
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
                    margin={{ horizontal: '5%' }}
                    width='40%'
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
            </Box>
            {errorState &&
                (<Box pad='small' margin={{bottom: 'small'}}>
                    <Text color="status-error">{errorState.response.statusText}</Text>
                </Box>)
            }
            <Box align='center'>
                <Button primary size='large' type='submit' label='Sign Up' />
            </Box>
        </Form>
        </Grommet>
    )
}
