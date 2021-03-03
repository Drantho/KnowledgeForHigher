import { React, useState } from 'react';

import { Grommet, Box, Text, Button, Form, FormField, TextInput } from 'grommet';

import API from "../utils/API";

export default function SignInForm(props) {
    const customTheme = {
        global: {
            colors: {
                focus: undefined
            }
        },
        formField: {
            focus: {
                background: {
                    color: 'white'
                }
            },
            border: undefined
        }
    }

    const [signInFormState, setSignInFormState] = useState({
        userName: '',
        password: ''
    });

    const [errorState, setErrorState] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        API.signIn(signInFormState).then((response) => {
            localStorage.setItem("token", response.data.token);
            props.setUserState({
                id: response.data.user.id,
                userName: response.data.user.userName,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                email: response.data.user.email,
                portrait: response.data.user.portrait,
                bio: response.data.user.bio,
                isSignedIn: true,
                token: response.data.token
            });
            setSignInFormState({ userName: '', password: '' });
        }).catch( (err) => {
            localStorage.clear('token');
            setErrorState({password: err.responseText});
        });
    }

    const handleInput = (event) => {
        setErrorState();
        setSignInFormState({...signInFormState, [event.target.name]: event.target.value});
    }

    const validatePassword = (password) => {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.'
        }
    }

    return (
        <Grommet theme={customTheme}>
            <Form errors={errorState} onSubmit={handleSubmit} value={signInFormState}>
                <FormField name='userName' htmlFor='sign-up-username' label='Username' required>
                    <TextInput
                        id='sign-up-username'
                        name='userName'
                        onChange={handleInput}
                        value={signInFormState.userName}
                        placeholder='Username' />
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
                        value={signInFormState.password} />
                </FormField>
                {errorState &&
                    (<Box pad={{ horizontal: 'small' }}>
                        <Text color="status-error">Incorrect username or password.</Text>
                    </Box>)
                }
                <Box>
                    <Button primary size='large' type='submit' label='Sign In' />
                </Box>
            </Form>
        </Grommet>
    )
}
