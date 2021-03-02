import React from 'react';
import { Box, Nav, Anchor, Header, Avatar } from 'grommet';
import { Link } from 'react-router-dom'


const Icon = '/assets/images/bookicon.png';

export default function LoginNavbar() {
    
        return (
            <Header background="#222E42" animation={{ type: "fadeIn", duration: "1000" }} elevation="large" pad="xsmall">
                <Box direction="row" align="center" gap="small">
                    <Anchor color="white">
                        <Avatar src={Icon} />
                    </Anchor>
                </Box>

                <Nav direction="row" >

                    <Box direction="row" align="center" gap="small" pad="small" className="navText">
                        <Anchor color="#FCE181">
                            <Link to='/signup' style={{ color: 'inherit', textDecoration: 'inherit' }}>Create Account</Link>
                        </Anchor>
                    </Box>

                    <Box direction="row" align="center" gap="small" pad="small">
                        <Anchor color="#FCE181">
                            <Link to='/signin' style={{ color: 'inherit', textDecoration: 'inherit' }}>Login</Link>
                        </Anchor>
                    </Box>

                </Nav>

            </Header>


        )
    }


