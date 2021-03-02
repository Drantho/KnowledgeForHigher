import { React, useState } from 'react';

import { Grommet, Box, Button, Tabs, Tab, Form, FormField, TextInput } from 'grommet';

import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import { keyframes } from 'styled-components';

export default function Splash(props) {

    const customTheme = {
        global: {
            colors: {
                focus: undefined
            }
        },
        tab: {
            focus: 'none',
            active: {
                background: '#FCE181',
                color: '#222E42'
            },
            color: '#FCE181',
            margin: {
                vertical: 'medium'
            },
            pad: 'small',
            border: undefined,
            extend: {
                borderRadius: '5px'
            }
        },
        tabs: {
            pad: 'small',
            width: '80%',
            header: {
                background: '#222E42',
                extend: {
                    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.50)',
                    borderRadius: '10px'
                }
            },
            panel: {
                extend: {
                    margin: '20px',
                    width: '60%',
                    alignSelf: 'center'
                }
            }
        }
    }

    return (
        <Grommet theme={customTheme}>
        <Box>
            <Box alignSelf='center' width='80%' margin='large' justify='center'>
                <Tabs>
                    <Tab title='Sign In'>
                        <SignInForm setUserState={props.setUserState} />
                    </Tab>
                    <Tab title='Sign Up'>
                        <SignUpForm setUserState={props.setUserState} />
                    </Tab>
                </Tabs>
            </Box>
        </Box>
        </Grommet>
    )
}
