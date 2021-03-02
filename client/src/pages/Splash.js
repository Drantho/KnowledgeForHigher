import { React, useState } from 'react';

import { Grommet, Box, Tabs, Tab } from 'grommet';

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

    const [index, setActiveIndex] = useState(0);
    const onActive = (nextIndex) => setActiveIndex(nextIndex);

    const goToSignInTab = () => {
        setActiveIndex(0);
    }

    return (
        <Grommet theme={customTheme}>
        <Box>
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
        </Box>
        </Grommet>
    )
}
