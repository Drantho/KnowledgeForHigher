import React, { Component } from 'react';
import { Box, Anchor, Avatar, Button, Grid, Text, Paragraph } from 'grommet';
import { Link } from 'react-router-dom'
import Tags from '../Tags'
import './style.css';


export default function Question(props) {
    console.log("test")
    
    const Icon = '/profilesample.png';
    return (
        <Box>
            <Box
                justify="center"
                align="center"
                
                background="#F3F3F3"
                round="5px"
                gridArea="questionbox"
                id="questionBox"
                border={{"size":"3px"}}
            >

                <Grid
                    areas={[
                        ['side','search', 'search', 'search'],
                        ['side','border', 'border', 'border'],
                        ['side','description', 'description', 'description'],
                        ['side','ratings','ratings','ratings'],
                        ['side','tags', 'tags', 'tags']
                    ]}
                    columns={['40px','flex', 'flex', 'flex']}
                    rows={['flex']}
                    responsive="true"
                >
                    <Box gridArea="side"  background="#DFDFE5">

                    </Box>

                    <Box gridArea="search">
                        <Anchor color="white" >
                            <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit' }}><Avatar src={Icon} size="50px" /></Link>
                        </Anchor>
                    </Box>

                    <Box gridArea="search" width="1000px" >
                        <Text size="40px" wordBreak="break-word" id="questionTitle">{props.props.title}</Text>
                    </Box>

                    <Box gridArea="border" border="bottom" />

                    <Box gridArea="description" id="questionSizeBox" >
                        <Box id="questionSize" wordBreak="break-word" pad="5px">
                            <Text size="medium">{props.props.text}</Text>
                        </Box>
                    </Box>

                    <Box gridArea="ratings">
                        
                    </Box>

                    <Box gridArea="tags" alignSelf="start"  direction="row" margin={{"top": "15px"}} >
                        {props.props.Tags.map(tag => <Tags key={tag.id}>{tag.name}</Tags>)}
                    </Box>
                </Grid>

            </Box>
        </Box>
    )
}


