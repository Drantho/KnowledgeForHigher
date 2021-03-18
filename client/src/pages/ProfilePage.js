import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grommet, Grid, Box, Tabs, Tab, Text } from 'grommet';

import API from '../utils/API';

import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';
import UserEditForm from '../components/UserEditForm';
import EntityCard from '../components/EntityCard';

export default function ProfilePage(props) {

    const { id } = useParams();
    const [ user, setUser ] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        bio: '',
        portrait: '',
        email: '',
        id: parseInt(id)
    });

    const [ questions, setQuestions ] = useState([]);
    const [services, setServices ] = useState([]);

    useEffect( async () => {
        console.log(id);
        console.log('use effect')
        const userGet = await API.getUserById(id);
        setUser({
            ...user,
            userName: userGet.data.userName,
            firstName: userGet.data.firstName,
            lastName: userGet.data.lastName,
            portrait: userGet.data.portrait,
            email: userGet.data.email,
            bio: userGet.data.bio
        });

        const questionGet = await API.getQuestionByUser(id);
        setQuestions(questionGet.data.map(e => ({ ...e, type: 'question' })));

        const servicesGet = await API.getServicesByUser(id);
        setServices(servicesGet.data.map( e => ({...e, type: 'service'})))
    }, [props])

    return (
        <Grid fill rows={[ 'auto', 'flex' ]}
            columns={[ 'auto', 'flex' ]}
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'sidebar', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] }
            ]}>

            <Box gridArea='header'>
                <Navbar userState={props.userState} />
            </Box>
            
            <Box margin={{ top: '90px' }} width='300px' gridArea='sidebar'>
                <UserSidebar user={user} userState={props.userState} />
            </Box>

            <Box gridArea='main' margin={{ top: '90px' }}>
                <Tabs>
                    <Tab title='Activity'>
                        
                    </Tab>

                    <Tab title='Questions'>
                        <Box align='center' margin={{ top: 'small' }} gap='xsmall'>
                            { questions.map( 
                                e => <EntityCard entity={e} userState={props.userState} />
                            )}
                        </Box>
                    </Tab>

                    <Tab title='Services'>
                        <Box align='center' margin={{ top: 'small' }} gap='xsmall'>
                            {services.map(
                                e => <EntityCard entity={e} userState={props.userState} />
                            )}
                        </Box>
                    </Tab>

                    { props.userState.id === user.id && 
                    
                        <Tab title='Edit'>
                            <Box pad='large'>

                                <UserEditForm 
                                    userState={props.userState} 
                                    setUserState={props.setUserState}/>
                            </Box>
                        </Tab>
                    }
                </Tabs>
            </Box>

        </Grid>
    )
}
