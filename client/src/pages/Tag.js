import { React, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/API';
import { Box, Grid, Heading, Button } from 'grommet';
import { Add } from 'grommet-icons';
import TagQuestion from '../components/TagQuestion'
import FollowedServices from '../components/FollowedServices'
import Service from '../components/Service'
import EntityCard from '../components/EntityCard';


export default function Tag(props) {
    const { id } = useParams();
    const [entitiesList, setEntitiesList] = useState([]);
    const [tag, setTag] = useState({ 
        name: "",
        description: "",
        Questions: [],
        Services: []
    });

    useEffect(() => {
        API.getTagById(id).then(response => {
            const data = response.data;
            console.log(data);
            data.Services.forEach( e => e.type = 'service');
            data.Questions.forEach( e => e.type = 'question');
            
            const entities = response.data.Questions.concat(response.data.Services);
            setEntitiesList(entities);
            setTag(response.data);
        }).catch(err => {
            console.log(`oops!`, err);
        });
    }, []);

    return (

        <Box gap='small' fill align='center' width='100%' margin={{top: '100px'}}>
            <Heading level={2}>
                Tagged: '{tag.name}'
            </Heading>
            {entitiesList.map( (e) => {
                console.log(e);
                return <EntityCard userState={props.userState} entity={e} />
            })}
        </Box>
    )
}
