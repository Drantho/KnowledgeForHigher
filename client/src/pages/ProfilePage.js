import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grommet, Grid, Box, Tabs, Tab, Text } from 'grommet';

import API from '../utils/API';

import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';
import UserEditForm from '../components/UserEditForm';
import EntityCard from '../components/EntityCard';
import UserFeed from '../components/UserFeed';

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
    }, [props]);

    const tabTheme = {
        tab: {
            active: {
                background: '#FCE181',
                color: '#222E42'
            },
            color: 'white',
            background: '#222E42',
            border: undefined,
            hover: {
                background: 'light-blue'
            },
            margin: undefined,
            pad: {
                bottom: undefined,
                horizontal: '20px'
            },
            extend: ` border-radius: 10px`
        },
        tabs: {
            header: {
                background: '#222E42',
                padding: '20px'
            }
        }
    }

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

            <Box 
                gridArea='main' 
                pad='small'  
                margin={{ top: '90px' }}>
                <Grommet theme={tabTheme}>
                <Tabs>
                    <Tab title='Activity'>
                        <Box height='80vh' overflow={{vertical: 'scroll'}}>
                            <UserFeed targetUser={user} userState={props.userState} />
                        </Box>
                    </Tab>

                    <Tab title='Questions'>
                        <Box 
                            align='center' 
                            margin={{ top: 'small' }} 
                            gap='xsmall'
                            height='80vh'
                            overflow={{ vertical: 'scroll' }}>
                            { questions.map( 
                                e => <EntityCard entity={e} userState={props.userState} />
                            )}
                        </Box>
                    </Tab>

                    <Tab title='Services'>
                        <Box 
                            align='center' 
                            margin={{ top: 'small' }} 
                            gap='xsmall'
                            height='80vh'
                            overflow={{ vertical: 'scroll' }}>
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
                </Grommet>
            </Box>

        </Grid>
    )
}
