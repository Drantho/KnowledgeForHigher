import React from 'react';
import { Box, Nav, Anchor, Header, Avatar, DropButton, Text } from 'grommet';
import { Link } from 'react-router-dom'
import { Chat } from 'grommet-icons';
import MediaQuery from 'react-responsive'

export default function UserNavbar(props) {

    const Icon = '/assets/images/bookicon.png';
    const ProfileIcon = "https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/" + props.userState.portrait + ".png";

    const logout = () => {
        localStorage.clear("token");
        localStorage.clear("portrait");
        window.location.reload();
    }

    const renderItems = () => {
        <Box>
            <Text>hi</Text>
            <Text>hi</Text>
            <Text>hi</Text>
            <Text>hi</Text>
        </Box>
    }

    return (
        <Box style={{ position: "fixed", top: 0, width: "100%" , zIndex: 10}}>
            <MediaQuery minDeviceWidth={1200}>
                <Header background="#222E42" animation={{ type: "fadeIn", duration: "1000" }} elevation="large" pad="xsmall" style={{ position: "fixed !important", top: 0, width: "100vw"}}>
                    {/* <pre>
                    {JSON.stringify(props, null, 4)}
                </pre>               */}
                    <Box direction="row" align="center" gap="small">
                        <Anchor color="white">
                            <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit' }}><Avatar src={Icon} /></Link>
                        </Anchor>
                        <Text size="25px" color="#FCE181">Knowledge4Hire</Text>
                    </Box>
                    <Nav direction="row" justify="end">
                        <Box direction="row" align="center" gap="small" pad="small">
                            <Anchor color="#FCE181">
                                <Link to='/ask' style={{ color: 'inherit', textDecoration: 'inherit' }}>Ask</Link>
                            </Anchor>
                        </Box>

                        <Box direction="row" align="center" gap="small" pad="small">
                            <Anchor color="#FCE181">
                                <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit' }}>Home</Link>
                            </Anchor>
                        </Box>

                        <Box direction="row" align="center" gap="small" pad="small" className="navText">
                            <Anchor color="#FCE181">
                                <Link to='/messages' style={{ color: "#FCE181", textDecoration: 'inherit' }}><Chat color="#FCE181" /></Link>
                            </Anchor>
                        </Box>

                        <Box direction="row" align="center" className="navText" pad="small">
                            <Anchor color="#FCE181">
                                <Link to='/profile' style={{ color: 'inherit', textDecoration: 'inherit' }}><Avatar size="40px" src={ProfileIcon} /></Link>
                            </Anchor>
                        </Box>

                        <Box direction="row" align="center" gap="small" pad="small">
                            <Anchor color="#FCE181">
                                <Link onClick={logout} style={{ color: 'inherit', textDecoration: 'inherit' }}>Logout</Link>
                            </Anchor>
                        </Box>
                    </Nav>
                </Header>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1200}>
                <Header background="#222E42" animation={{ type: "fadeIn", duration: "1000" }} elevation="large" pad="xsmall" style={{ position: "fixed !important", top: 0, width: "100vw", zIndex: 10}}>
                    {/* <pre>
                    {JSON.stringify(props, null, 4)}
                </pre>               */}
                    <Box direction="row" align="center" gap="small">
                        <Anchor color="white">
                            <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit' }}><Avatar src={Icon} /></Link>
                        </Anchor>
                    </Box>
                    <Nav direction="row">
                        <DropButton
                            label="Menu"
                            color="#FCE181"
                            dropAlign={{ top: 'bottom', right: 'right' }}
                            dropContent={
                                <Box background="#222E42">
                                    <Box direction="row" align="center" gap="small" pad="small">
                                        <Anchor color="#FCE181">
                                            <Link to='/ask' style={{ color: 'inherit', textDecoration: 'inherit' }}>Ask</Link>
                                        </Anchor>
                                    </Box>

                                    <Box direction="row" align="center" gap="small" pad="small">
                                        <Anchor color="#FCE181">
                                            <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit' }}>Home</Link>
                                        </Anchor>
                                    </Box>

                                    <Box direction="row" align="center" gap="small" pad="small" className="navText">
                                        <Anchor color="#FCE181">
                                            <Link to='/messages' style={{ color: "#FCE181", textDecoration: 'inherit' }}><Chat color="#FCE181" /></Link>
                                        </Anchor>
                                    </Box>

                                    <Box direction="row" align="center" className="navText" pad="small">
                                        <Anchor color="#FCE181">
                                            <Link to='/profile' style={{ color: 'inherit', textDecoration: 'inherit' }}><Avatar size="40px" src={ProfileIcon} /></Link>
                                        </Anchor>
                                    </Box>

                                    <Box direction="row" align="center" gap="small" pad="small">
                                        <Anchor color="#FCE181">
                                            <Link onClick={logout} style={{ color: 'inherit', textDecoration: 'inherit' }}>Logout</Link>
                                        </Anchor>
                                    </Box>
                                </Box>
                            }
                        />
                    </Nav>
                </Header>
            </MediaQuery>
        </Box>

    )
}


