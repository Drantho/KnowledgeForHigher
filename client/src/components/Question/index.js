import React from 'react';
import { Box, Anchor, Avatar, Grid, Text } from 'grommet';
import { Link } from 'react-router-dom'
import Tags from '../Tags'
import './style.css';
import { Down, Up } from 'grommet-icons';

export default function Question(props) {
    console.log("test");

    const thumbnail = `https://res.cloudinary.com/drantho/image/upload//w_125,h_125,c_crop,g_face,r_max/w_200/${props.props.User.portrait}.jpg`;

    return (
        <Box>
            <Box
                justify="center"
                align="center"

                background="#F3F3F3"
                round="5px"
                gridArea="questionbox"
                id="questionBox"
                border={{ "size": "3px" }}
            >

                <Grid
                    areas={[
                        // ['blank','name', 'name', 'name'],
                        ['votes', 'title', 'title', 'title'],
                        ['side', 'border', 'border', 'border'],
                        ['side', 'description', 'description', 'description'],
                        ['side', 'ratings', 'ratings', 'ratings'],
                        ['side', 'tags', 'tags', 'tags']
                    ]}
                    columns={['40px', 'flex', 'flex', 'flex']}
                    rows={['flex']}
                    responsive="true"
                >
                    <Box gridArea="votes" background="#DFDFE5">
                        <Box margin={{ "left": "7px" }}>
                            <Up />
                            <Text margin={{ "left": "7px", "top": "-11px" }}>{props.props.Ratings.filter(rating => rating.isPositive).length}</Text>

                            <Box border margin={{ "right": "15px", "left": "7px", "top": "5px", "bottom": "5px" }} />
                            <Text margin={{ "left": "7px", "bottom": "-11px" }}>{props.props.Ratings.filter(rating => !rating.isPositive).length}</Text>
                            <Down />
                        </Box>
                    </Box>
                    <Box gridArea="side" background="#DFDFE5" />
                    <Box gridArea="blank" background="#DFDFE5" />

                    {/* <Box gridArea="profile"  margin={{"top":"14px"}}>
                        <Anchor color="white" >
                            <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit' }}><Avatar src={Icon} size="35px" /></Link>
                        </Anchor>
                    </Box> */}


                    <Box margin="15px" alignSelf="start">                    
                        <Anchor color="white">
                            
                            <Link to={`/users/${props.props.User.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}><Avatar title={props.props.User.userName} src={thumbnail} size="35px" /></Link>
                        </Anchor>
                    </Box>



                    <Box gridArea="title" width="1000px" margin={{"left":"-65px"}}>
                        <Text size="40px" wordBreak="break-word" id="questionTitle" >
                            {props.props.title} {props.props.title} 
                        </Text>
                    </Box>

                    <Box gridArea="border" border="bottom" />

                    <Box gridArea="description" id="questionSizeBox" >
                        <Box id="questionSize" wordBreak="break-word" pad="5px">
                            <Text size="medium">{props.props.text}</Text>
                        </Box>
                    </Box>

                    <Box gridArea="ratings">

                    </Box>

                    <Box gridArea="tags" alignSelf="start" direction="row" margin={{ "top": "15px" }} >
                        {props.props.Tags.map(tag => <Tags key={tag.id}>{tag.name}</Tags>)}
                    </Box>
                </Grid>

            </Box>
        </Box>
    )
}


