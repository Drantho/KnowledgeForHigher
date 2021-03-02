import React from 'react';
import { Box, Grid, Anchor, Avatar, Text } from 'grommet';
import { Link } from 'react-router-dom'
import QuestionTags from '../QuestionTags'
import { Down, Up } from 'grommet-icons';

export default function Service(services) {
    const thumbnail = `https://res.cloudinary.com/drantho/image/upload//w_125,h_125,c_crop,g_face,r_max/w_200/${services.props.User.portrait}.jpg`;
    console.log(services)
    return (
        <Box alignSelf="start" margin={{ "right": "10px" }}>
            <Box
                direction="row"
                align="center"
                background="#F3F3F3"
                round="5px"
                gridArea="tag"
                elevation="small"
                margin={{
                    "top": "20px",
                    "left": "25px",
                    "right": "25px"
                }}
            >

                <Grid
                    areas={[
                        ['votes', 'picture', 'name'],
                        ['blank', 'title', 'title'],
                        ['tag', 'tag', 'tag']
                    ]}
                    columns={['40px', '60px', 'flex']}
                    rows={['flex']}
                    responsive="true"
                >
                    <Box gridArea="votes" background="#DFDFE5">
                        <Box margin={{ "left": "7px" }}>
                            <Up />
                            <Text margin={{ "left": "7px", "top": "-11px" }}>{services.props.Ratings.filter(rating => rating.isPositive).length}</Text>

                            <Box border margin={{ "right": "15px", "left": "7px", "top": "5px", "bottom": "5px" }} />
                            <Text margin={{ "left": "7px", "bottom": "-11px" }}>{services.props.Ratings.filter(rating => !rating.isPositive).length}</Text>
                            <Down />
                        </Box>
                    </Box>

                    <Box gridArea="blank" background="#DFDFE5" />

                    <Box gridArea="picture" >
                        <Box pad="10px">
                            <Anchor color="white">
                                <Link to={`/users/${services.props.User.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}><Avatar title={services.props.User.userName} src={thumbnail} size="35px" /></Link>
                            </Anchor>
                        </Box>
                    </Box>
                    <Box gridArea="name" width="500px">
                        <Box pad="10px" margin={{ "top": "-10px" }}>
                            <Link to={`/users/${services.props.UserId}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                                <Box>
                                <Text size="20px">{services.props.User.userName}</Text>
                                </Box>
                            </Link>
                        </Box>
                    </Box>
                    <Box gridArea="title" margin={{"top":"-40px"}}>
                        <Link to={`/service/${services.props.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <Box>
                            <Text size="25px">{services.props.name}</Text>
                            </Box>
                        </Link>
                    </Box>
                    <Box gridArea="tag">
                        {services.props.Tags.map(tag => <QuestionTags props={tag} />)}
                    </Box>
                </Grid>
                {/* {services.props.discription} */}
            </Box>
        </Box>
    )
}


