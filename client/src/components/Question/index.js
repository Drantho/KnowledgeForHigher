import React from 'react';
import { Box, Anchor, Avatar, Grid, Text,Heading,Paragraph,Stack} from 'grommet';
import { Link } from 'react-router-dom'
import './style.css';
import { Down, Up } from 'grommet-icons';
import QuestionTags from '../QuestionTags'

export default function Question(props) {
    console.log("test");

    const thumbnail = `https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/${props.props.User.portrait}.jpg`;

    return (
     
        <Box>
            <Box
                justify="center"
                align="center"
                margin={{"top":"-30px"}}
                background="#F3F3F3"
                round="5px"
                gridArea="questionbox"
                id="questionBox"
                border={{ "size": "3px" }}
            >

                <Grid
                    areas={[
                        ['votes', 'title', 'title', 'title','icon'],
                        ['side', 'border', 'border', 'border','border'],
                        ['side', 'description', 'description', 'description','description'],
                        ['side', 'ratings', 'ratings', 'ratings','ratings'],
                        ['side', 'tags', 'tags', 'tags','tags']
                    ]}
                    columns={['40px', 'flex', 'flex', 'flex','70px']}
                    rows={['flex']}
                    responsive="true"
                >
                    <Box gridArea="votes" background="#DFDFE5">
                        <Box margin={{ "left": "7px" }}>
                            <Up/>
                            <Text margin={{ "left": "7px", "top": "-11px" }} color="green">{props.props.Ratings.filter(rating => rating.isPositive).length}</Text>

                            <Box border margin={{ "right": "15px", "left": "7px", "top": "5px", "bottom": "5px" }} />
                            <Text margin={{ "left": "7px", "bottom": "-11px" }} color="red">{props.props.Ratings.filter(rating => !rating.isPositive).length}</Text>
                            <Down/>
                        </Box>
                    </Box>
                    <Box gridArea="side" background="#DFDFE5" />
                    <Box gridArea="blank" background="#DFDFE5" />

                      
                    <Box margin="15px" alignSelf="start" gridArea="icon">                  
                        <Anchor color="white">
                            
                            <Link to={`/users/${props.props.User.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}><Avatar title={props.props.User.userName} src={thumbnail} size="35px" /></Link>
                        </Anchor>
                    </Box>
                    

                    <Box gridArea="title" width="1000px" margin={{left:"6px"}}>
                        <Link to={`/question/${props.props.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        <Box>
                        <Heading   level={3}>
                            {props.props.title}
                        </Heading>
                        </Box>
                        </Link>
                    </Box>
                    
                    <Box gridArea="border" border="bottom" />

                    <Box gridArea="description"  >
                        <Box pad="5px">
                            <Text >{props.props.text}</Text>
                        </Box>
                    </Box>


                    <Box gridArea="tags" alignSelf="start" direction="row" margin={{ "top": "15px" }} >
                        {props.props.Tags.map(tag => <QuestionTags props={tag}/>)}

                    </Box>
                </Grid>

            </Box>
        </Box>
    )
}
