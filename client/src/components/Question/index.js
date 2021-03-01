import React, { Component } from 'react';
import { Box, Anchor, Avatar, Button, Grid, Text, Paragraph } from 'grommet';
import { Link } from 'react-router-dom'
import Tags from '../Tags'
import './style.css';


export default function Question(props) {

    const Icon = '/bookicon.png';
    return (
        <Box>
            <Box
                justify="center"
                align="center"
                pad="10px"
                background="#F3F3F3"
                round="5px"
                gridArea="questionbox"
                id="questionBox"
            >

                <Grid
                    areas={[
                        ['search', 'search', 'search'],
                        ['border', 'border', 'border'],
                        ['description', 'description', 'description'],
                        ['tags', 'tags', 'tags']
                    ]}
                    columns={['flex', 'flex', 'flex']}
                    rows={['flex']}
                    responsive="true"
                >
                    {/* <Box gridArea="add"  id="avatarIcon">
                        <Anchor color="white" >
                            <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit'}}><Avatar src={Icon} size="50px"/></Link>
                        </Anchor>
                    </Box> */}

                    {/* <Box gridArea="search" border id="questionTitleBox" >
                        
                         <Text id="questionTitle" size="40px" >{props.props.title}</Text>
                    </Box> */}

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

                    {/* <pre>{JSON.stringify(props,null,4)}</pre> */}

                    <Box gridArea="tags" alignSelf="start"  direction="row" >
                        {props.props.Tags.map(tag => <Tags key={tag.id}>{tag.name}</Tags>)}
                    </Box>
                </Grid>

            </Box>
        </Box>
    )
}


