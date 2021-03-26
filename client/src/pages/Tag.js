import { React, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import API from '../utils/API';
import { Box, Heading, Anchor } from 'grommet';
import EntityCard from '../components/EntityCard';
import Navbar from '../components/Navbar';
import NothingHereDisplay from '../components/NothingHereDisplay';


export default function Tag(props) {
    const { id } = useParams();
    const history = useHistory();
    const [entitiesList, setEntitiesList] = useState([]);
    const [tag, setTag] = useState({ 
        name: "",
        description: "",
        Questions: [],
        Services: []
    });

    useEffect(() => {
        if ( !isNaN(parseInt(id)) && typeof (parseInt(id)) === 'number') {
            API.getTagById(id).then( (response) => {
                const data = response.data;
                data.Services.forEach( e => e.type = 'service');
                data.Questions.forEach( e => e.type = 'question');
                
                const entities = data.Questions.concat(data.Services);
                setEntitiesList(entities);
                setTag(data);
            }).catch(err => {
                console.log(`oops!`, err);
            });
        } else {
            API.getTagbyName(id).then( (response) => {
                const data = response.data;
                data.Services.forEach( e => e.type = 'service');
                data.Questions.forEach( e => e.type = 'question');
                
                const entities = data.Questions.concat(data.Services);
                setEntitiesList(entities);
                setTag(data);
            }).catch(err => {
                console.log(`oops!`, err);
            });
        }
    }, []);

    return (
        <Box width='100%'>
            <Navbar userState={props.userState} />

            <Box gap='small' fill align='center' width='100%' margin={{top: '100px'}}>
                { history.length > 0 &&
                    <Anchor 
                        margin={{ left: '5%' }} 
                        alignSelf='start' 
                        onClick={() => history.goBack()}
                    >
                        &lt; Back
                    </Anchor> }

                <Heading margin={{ vertical: '5px' }} level={2}>
                    Tagged: '{tag.name}'
                </Heading>
  
                <Box width='90%' height='3px' background='#222e42' />

                { entitiesList.length > 0 ? 
                    entitiesList.map( e => <EntityCard width='90%'
                                                showUser 
                                                userState={props.userState} 
                                                entity={e} /> )
                
                    :
                    <NothingHereDisplay
                        container={{
                            width: '70%',
                            pad: {
                                vertical: 'medium'
                            }
                        }} /> }
            </Box>
        </Box>
    )
}
