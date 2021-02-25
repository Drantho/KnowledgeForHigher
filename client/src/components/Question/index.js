import React, { Component } from 'react';
import { Box, Anchor, Avatar, Button,Grid,Text, Paragraph } from 'grommet';
import { Link } from 'react-router-dom'
import './style.css';


export default function Question() {

    const Icon = '/bookicon.png';
    return (
        <Box
            justify="center"
            align="center"
            pad="10px"
            background="#F3F3F3"
            round="5px"
            id="questionBox"
        >
           
                <Grid
                    areas={[
                        ['add', 'search',  'search'],
                        ['description', 'description', 'description']
                    ]}
                    columns={['1/4', 'flex',  'flex']}
                    rows={['flex']}
                    responsive="true"
                >
                    <Box gridArea="add" border="bottom">
                        <Anchor color="white" >
                            <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit'}}><Avatar src={Icon} size="37px"/></Link>
                        </Anchor>
                    </Box>

                    <Box gridArea="search" id="questionTitleBox" border="bottom">
                         <Text id="questionTitle" size="20px"> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 15 </Text>
                    </Box>

                    <Box gridArea="description" id="questionSizeBox">
                         <Box id="questionSize" wordBreak="break-word" pad="5px"><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></Box>
                    </Box>

                </Grid>
        
            </Box>

    )
}


