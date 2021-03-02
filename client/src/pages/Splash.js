import { React, useState } from 'react';

import { Grommet, Box, Button, Tabs, Tab, Form, FormField, TextInput } from 'grommet';

import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';


export default function Splash(props) {

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

    const [ signInFormState, setSignInFormState ] = useState({
        username: '',
        password: ''
    });
    const handleSignin = (event) => {

    }
    const handleUsernameInput = (event) => {
        console.log(event);
        setSignInFormState({...signInFormState, username: event.target.value});
    }
    const handlePasswordInput = (event) => {
        console.log(event);
        setSignInFormState({...signInFormState, password: event.target.value});
    }

    return (
        <Grommet theme={customTheme}>
        <Box margin='large' justify='center'>
            <Tabs>
                <Tab title='Sign In'>
                    <SignInForm setUserState={props.setUserState} />
                </Tab>
                <Tab title='Sign Up'>
                    <SignUpForm setUserState={props.setUserState} />
                </Tab>
            </Tabs>
        </Box>
        </Grommet>
    )
}
