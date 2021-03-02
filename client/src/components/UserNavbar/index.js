import React from 'react';
import { Box, Nav, Anchor, Header, Avatar } from 'grommet';
import { Link } from 'react-router-dom'
import { Chat } from 'grommet-icons';

export default function UserNavbar(props) {
    
    const Icon = '/assets/images/bookicon.png';
    const ProfileIcon = "https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/" + props.userState.portrait + ".png";

        return (
            <Header background="#222E42" animation={{ type: "fadeIn", duration: "1000" }} elevation="large" pad="xsmall">                
                <Box direction="row" align="center" gap="small">
                    <Anchor color="white">
                        <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit'}}><Avatar src={Icon}/></Link>
                    </Anchor>
                </Box>
                <Nav direction="row">

                    <Box direction="row" align="center" gap="small" pad="small">
                        <Anchor color="#FCE181">
                            <Link to='/ask' style={{ color: 'inherit', textDecoration: 'inherit'}}>Ask</Link>
                        </Anchor>
                    </Box>

                    <Box direction="row" align="center" gap="small" pad="small">
                        <Anchor color="#FCE181">
                            <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit'}}>Home</Link>
                        </Anchor>
                    </Box>

                    <Box direction="row" align="center" gap="small" pad="small" className="navText">
                        <Anchor color="#FCE181">
                            <Link to='/messages' style={{ color: "#FCE181", textDecoration: 'inherit'}}><Chat color="#FCE181"/></Link>
                        </Anchor>
                    </Box>

                    <Box direction="row" align="center"   className="navText">
                        <Anchor color="#FCE181">
                            <Link to='/profile' style={{ color: 'inherit', textDecoration: 'inherit'}}><Avatar size="40px" src={ProfileIcon}/></Link>
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


