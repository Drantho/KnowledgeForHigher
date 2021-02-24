import React, { Component } from 'react';
import { Box, Nav, Anchor, Header, Avatar } from 'grommet';
import { Link } from 'react-router-dom'


const Icon = '/bookicon.png';

class UserNavbar extends Component {
    render() {
        return (
            <Header background="#222E42" animation={{ type: "fadeIn", duration: "1000" }} elevation="large" pad="xsmall">
                <Box direction="row" align="center" gap="small">
                    <Anchor color="white">
                        <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}><Avatar src={Icon}/></Link>
                    </Anchor>
                </Box>
            
                <Nav direction="row">

                    <Box direction="row" align="center" gap="small" pad="small">
                        <Anchor color="#FCE181">
                            <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>Home</Link>
                        </Anchor>
                    </Box>

                    <Box direction="row" align="center" gap="small" pad="small" className="navText">
                        <Anchor color="#FCE181">
                            <Link to='/profile' style={{ color: 'inherit', textDecoration: 'inherit'}}>Profile</Link>
                        </Anchor>
                    </Box>

                    <Box direction="row" align="center" gap="small" pad="small">
                        <Anchor color="#FCE181">
                            <Link to='/signout' style={{ color: 'inherit', textDecoration: 'inherit'}}>Logout</Link>
                        </Anchor>
                    </Box>

                </Nav>
         
            </Header>


        )
    }
}

export default UserNavbar;