import { React, useState, useRef } from 'react';

import { Grommet, Button, Box, Tabs, Tab, Layer, Text } from 'grommet';

import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

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
            size: 'large',
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

    const dismissButtonTheme = {
        button: {
            border: {
                color: 'rgba(34, 46, 66, 0.9)'
            },
            primary: {
                color: 'rgba(34, 46, 66, 0.9)'
            }
        }
    }

    // State and controls for setting active tab
    const [index, setActiveIndex] = useState(0);
    const onActive = (nextIndex) => {
        setActiveIndex(nextIndex);
        if (nextIndex === 1) {
            onClose();
        }
    };

    const goToSignInTab = () => {
        setActiveIndex(0);
        onOpen();
    };

    // State and controls for notification
    const [alert, openAlert] = useState();
    const onOpen = () => {
        openAlert(true);
        setTimeout( () => {
            openAlert(undefined);
        }, 3000);
    };

    const onClose = () => {
        openAlert(undefined);
    };

    const ref = useRef();

    return (
        <Grommet theme={customTheme}>
        <Box margin={{top: '74px'}} ref={ref} pad={{bottom: '30px'}} >
            <Box alignSelf='center' width='80%' margin='large' justify='center'>
                <Tabs activeIndex={index} onActive={onActive}>
                    <Tab title='Sign In'>
                        <SignInForm setUserState={props.setUserState} />
                    </Tab>
                    <Tab title='Sign Up'>
                        <SignUpForm setUserState={props.setUserState}
                            goToSignInTab={goToSignInTab} />
                    </Tab>
                </Tabs>
            </Box>
        {alert && 
        <Grommet theme={dismissButtonTheme}>
        <Layer background='rgba(252,225,129,0.7)' 
            margin={{top: '50px'}} 
            position='bottom' 
            modal={false} 
            onEsc={onClose}
            target={ref.current} >
            <Box pad='medium'>
                <Box direction='row'>
                    <Text margin={{right: 'medium', left: 'small'}}>Sign up successful! Please sign in to continue.</Text>
                    <Button primary onClick={onClose} label='Dismiss' />
                </Box>
            </Box>
        </Layer></Grommet>}
        </Box>
        </Grommet>
    )
}
