import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import { Grommet, Box, Header, Heading, Image, Button, Anchor } from 'grommet';

import UserWidget from './UserWidget';

import './Navbar.css'

export default function Navbar(props) {

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
    return (
        <Grommet theme={theme}>
        <Header 
            elevation='small'
            border={{ side: 'bottom', color: '#FCE181', size: '5px'}} 
            id='nav' 
            pad='small' 
            justify='between' 
            background='#222E42'>
            <Box align='center' direction='row'>
                <Image width='56px' sizes='small' src='./assets/images/bookicon.png' />
                <Heading color='#FCE181' 
                    margin={{vertical: '0px', left: '3px'}} 
                    level={3}>
                        Knowledge4Hire
                </Heading>
            </Box>

            { props.userState.isSignedIn ? 
                <Box align='center' gap='medium' direction='row'>
                    <Box direction='row' gap='small'>
                        <Link to='/ask'>Ask</Link>
                        <Link to='/home'>Home</Link>
                    </Box>
                    <UserWidget userState={props.userState} />
                </Box>

                :

                <Box direction='row' gap='small'>
                    <Button default label='Sign Up' href='/splash' />
                    <Button default label='Sign In' href='/splash' />
                </Box>
            }
            
        </Header>
        </Grommet>
    )
}
