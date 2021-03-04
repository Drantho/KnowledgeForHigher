import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/API';
import { Box, Grid, Heading, Button } from 'grommet';
import { Add } from 'grommet-icons';
import TagQuestion from '../components/TagQuestion'
import FollowedServices from '../components/FollowedServices'
import Service from '../components/Service'
import QuestionCard from '../components/QuestionCard';


export default function Tag(props) {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [services, setServices] = useState([]);
    const [tag, setTag] = useState({
        name: "",
        description: "",
        Questions: [],
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
            console.log(response.data)
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

        <Box fill align='center' width='100%' margin={{top: '100px'}}>
            <Heading level={2}>
                Tagged: '{tag.name}'
            </Heading>
            {tag.Questions.map( (e) => {
                console.log(e);
                return <QuestionCard userState={props.userState} question={e} />
            })}
        </Box>
    )
}
