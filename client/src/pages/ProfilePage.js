import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grommet, Grid, Box, Tabs, Tab, Text, Layer } from 'grommet';
import { Add } from 'grommet-icons';

import API from '../utils/API';

import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';
import UserEditForm from '../components/UserEditForm';
import EntityCard from '../components/EntityCard';
import UserFeed from '../components/UserFeed';
import AddServiceForm from '../components/AddServiceForm';
import Ask from './Ask';

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
    const [ services, setServices ] = useState([]);

    const [ questionFormOpen, setQuestionFormOpen ] = useState(false);
    const [ serviceFormOpen, setServiceFormOpen ] = useState(false);

    useEffect( async () => {

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
        global: {
            focus: {
                border: {
                    color: 'rgba(0,0,0,0)'
                }
            },
            button: {
                active: {
                    background: {
                        color: '#FCE181'
                    }
                }
            }
        },
        tab: {
            width: '300px',
            active: {
                background: '#FCE181',
                color: '#222E42',
            },
            color: 'black',
            background: '#9dbacc',
            border: undefined,
            hover: {
                background: '#ffedab',
                color: 'black'
            },
            margin: undefined,
            pad: {
                bottom: undefined,
                vertical: '10px',
                horizontal: '20px'
            },
            extend: ` 
                border-radius: 10px;
            `
        },
        tabs: {
            gap: 'small',
            header: {
                background: '#9dbacc',
                extend: `
                    padding: 10px; 
                    box-shadow: 0 3px 5px -5px  #222E42
                `
            }
        }
    }

    return (
        <Grommet full>
        <Grid fill rows={[ 'auto', 'flex' ]}
            columns={[ 'auto', 'flex' ]}
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'sidebar', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] }
            ]}>

            <Box margin={{ bottom: undefined }} gridArea='header'>
                <Navbar userState={props.userState} />
            </Box>

            <Box margin={{ top: '77px' }} width='300px' gridArea='sidebar'>
                <UserSidebar user={user} userState={props.userState} />
            </Box>

            <Box 
                gridArea='main' 
                margin={{ top: '77px' }}>
                <Grommet theme={tabTheme}>
                <Tabs>
                    <Tab title='Activity'>
                        <Box style={{ overflowY: 'scroll', height: '80vh' }}>
                            <UserFeed targetUser={user} userState={props.userState} />
                        </Box>
                    </Tab>

                    <Tab title='Questions'>
                        <Box 
                            align='center' 
                            margin={{ top: 'small' }} 
                            gap='xsmall'
                        >
                            { props.userState.id === user.id &&
                                <Box
                                    border={{ size: '1px' }}
                                    hoverIndicator
                                    onClick={() => setQuestionFormOpen(true)}
                                    width='85%'
                                    gap='small'
                                    pad='small'
                                    round='small'
                                    direction='row'
                                >
                                    <Add />
                                    <Text>Add a new question...</Text>
                                </Box>
                            }
                            
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

                            { props.userState.id === user.id && 
                                <Box 
                                    border={{ size: '1px' }} 
                                    hoverIndicator
                                    onClick={() => setServiceFormOpen(true)}
                                    width='85%' 
                                    gap='small'
                                    pad='small' 
                                    round='small'
                                    direction='row'
                                >
                                    <Add />
                                    <Text>Add a new service...</Text>
                                </Box>
                            }

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

                { questionFormOpen && 
                    <Layer style={{ width: '50%', padding: '10px' }}
                        modal
                        onClickOutside={() => setQuestionFormOpen(false)} 
                        onEsc={() => setQuestionFormOpen(false)}
                    >
                        <Ask 
                            userState={props.userState} 
                            onSubmit={() => setQuestionFormOpen(false)} />
                    </Layer>
                }

                { serviceFormOpen && 
                    <Layer style={{ width: '50%', padding: '10px' }}
                        modal
                        onClickOutside={() => setServiceFormOpen(false)}
                        onEsc={() => setServiceFormOpen(false)}
                    >
                        <AddServiceForm 
                            onSubmit={() => setServiceFormOpen(false)} 
                            userState={props.userState} />
                    </Layer>
                }
            </Box>

        </Grid>
        </Grommet>
    )
}
