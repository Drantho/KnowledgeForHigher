import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/API';
import { Box, Grid, Text, Button } from 'grommet';
import TagQuestion from '../components/TagQuestion'
import FollowedServices from '../components/FollowedServices'
import Service from '../components/Service'


export default function Tag(props) {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [services, setServices] = useState([]);
    const [tag, setTag] = useState({
        name: "",
        description: "",
        Questions: [{
            title: "",
            Tags: []
        }],
        Services: [{
            name: "",
            User: {
                userName: "",
            }
        }]
    });

    useEffect(() => {
        API.getTagById(id).then(response => {
            setTag(response.data);
            console.log(response.data);
        }).catch(err => {
            console.log(`oops!`, err);
        });

        API.getQuestionsByTagName(tag.name).then(response => {
            console.log(`getQuestions: `, response);
            setQuestions(response.data);
        }).catch(err => {
            console.log(err);
        });

        API.getServicesByTag(tag.name).then(response => {
            console.log(`getServices: `, response);
            setServices(response.data);
        }).catch(err => {
            console.log(err);
        });
    }, [])

    const handleFollowTag = tag =>{
        console.log(`handlefollowtag(${tag}) clicked`);
        API.linkTagToUser({tags: [tag]}, props.userState.token).then(response => {
            console.log(response);
        });
    }

    

    return (
        <Box margin={{ top: "75px" }}>
            {/* <h1>Tag Page: {id}</h1>
            <h2>{tag.name}</h2>
            <h3>Questions:</h3>
            <ul>
                {tag.Questions.map(question => <li key={question.id}><Link to={`/question/${question.id}`}>{question.title}</Link></li>)}
            </ul>
            <h3>Services:</h3>
            <ul>
                {tag.Services.map(service => <li key={service.id}><Link to={`/service/${service.id}`}>{service.name}</Link> - <Link to={`/users/${service.User.id}`}>{service.User.userName}</Link></li>)}
            </ul> */}

            <Grid
                areas={[
                    ['blank3', 'search', 'blank4'],
                    ['blank1', 'main', 'blank2'],
                    ['myTags', 'question', 'services'],
                    ['myTags', 'question', 'services']
                ]}
                columns={['1/4', 'flex', '1/4']}
                rows={['50px']}
                gap="small"
                responsive="true"
            >
                <Box gridArea="blank1" />
                <Box gridArea="blank2" />
                <Box gridArea="blank3" />
                <Box gridArea="blank4" />

                {/* =========================================================== */}

                {/* <Box gridArea="search" margin={{ "top": "-70px" }} ><QuestionBox searchString={searchString} handleInputChanged={handleInputChanged} handleSearchClick={handleSearchClick}/></Box> */}

                {/* =========================================================== */}


                <Box gridArea="main" height="flex" >
                    <Box margin={{ "bottom": "50px" }}>
                        <Box
                            justify="center"
                            align="center"
                            pad="5px"
                            background="#222E42"
                            round="5px"
                            height="60px"
                        >

                            <Grid
                                areas={[
                                    ['title', 'title', 'button'],
                                ]}
                                columns={['flex', 'flex', 'flex']}
                                rows={['45px']}
                                gap="15px"
                                responsive="true"
                            >
                                <Box gridArea="title">
                                    <Text size="25px">{tag.name} questions</Text>
                                </Box>
                                <Box gridArea="button">
                                    <Button onClick={()=>handleFollowTag(tag.name)}>follow {tag.name}</Button>
                                </Box>
                            </Grid>
                        </Box>
                    </Box>
                </Box>

                <Box gridArea="question" margin={{ "top": "-10px", }} >
                    {questions.map(question => <TagQuestion props={question} />)}

                </Box>

                <Box gridArea="services">
                    <FollowedServices />
                    <Box>
                        {services.map(service => <Service props={service} />)}
                    </Box>
                </Box>

            </Grid>
        </Box>
    )
}
