import { React, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Grommet, Box, Header, Heading, Image, Button, Anchor } from 'grommet';
import { Chat } from 'grommet-icons';

import UserWidget from './UserWidget';

import './Navbar.css';

export default function Navbar(props) {
    const history = useHistory();

    const theme = {
        button: {
            border: {
                radius: '5px'
            },
            default: {
                background: {
                    color: '#FCE181'
                }
            }
        },
        global: {
            colors: {
                focus: undefined
            }
        }
    }

    const icon = '/assets/images/bookicon.png';

    const handleLogout = (event) => {
        localStorage.clear("token");
        localStorage.clear("portrait");
        history.push('/home');
        history.go(0);
    }

    return (
        <Grommet theme={theme}>
        <Header 
            elevation='small'
            border={{ side: 'bottom', color: '#FCE181', size: '5px'}} 
            id='nav' 
            pad='9px' 
            justify='between' 
            background='#222E42'
        >
            <Box 
                onClick={() => history.push('/home')} 
                align='center' 
                direction='row'
            >
                <Image width='56px' sizes='small' src={icon} />
                <Heading color='#FCE181' 
                    margin={{vertical: '0px', left: '6px'}} 
                    level={3}
                >
                        Knowledge4Hire
                </Heading>
            </Box>

            { props.userState && props.userState.isSignedIn ? 
                <Box align='center' gap='medium' direction='row'>
                    <Box direction='row' gap='medium'>
                        
                        <Anchor>
                            <Link
                                to='/ask' 
                                style={{ color: '#fce181', textDecoration: 'inherit' }}
                            >
                                Ask
                            </Link>
                        </Anchor>

                        <Anchor>
                            <Link
                                to='/home' 
                                style={{ color: '#fce181', textDecoration: 'inherit' }}
                            >
                                Home
                            </Link>
                        </Anchor>

                        { props.userState.isSignedIn && 
                            <Anchor color="#FCE181">
                                <Link 
                                    to='/messages' 
                                    style={{ color: "#FCE181", textDecoration: 'inherit' }}
                                >
                                    <Chat color="#FCE181" />
                                </Link>
                            </Anchor>
                        }

                        { props.userState.isSignedIn && 
                            <Anchor onClick={handleLogout} color='#fce181'>
                                Logout
                            </Anchor>
                        }
                    </Box>
                    <UserWidget userState={props.userState} />
                </Box>

                :

                <Box direction='row' gap='small'>
                    <Button default label='Sign Up' href='/splash/signup' />
                    <Button default label='Sign In' href='/splash/signin' />
                </Box>
            }
            
        </Header>
        </Grommet>
    )
}
