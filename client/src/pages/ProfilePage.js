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
import cardTheme from '../components/cardTheme.json'
import NothingHereDisplay from '../components/NothingHereDisplay';
import ProfileCreateBanner from '../components/ProfileCreateBanner';

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
        setServices(servicesGet.data.map( e => ({ ...e, type: 'service' })))
    }, [props, id]);

    const tabTheme = {
        global: {
            colors: {
                focus: {
                    border: undefined
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

    const tabPaneTheme = {
        ...cardTheme,
        global: {
            colors: {
                focus: {
                    border: undefined
                }
            },
            hover: {
                background: {
                    color: '#222e42'
                },
                color: 'white'
            }
        }
    }

    const headerOffset = '79px';

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
                <Navbar userState={props.userState} setUserState={props.setUserState} />
            </Box>

            <Box align='center' margin={{ top: headerOffset }} width='300px' gridArea='sidebar'>
                <UserSidebar 
                    user={user}
                    userState={props.userState} 
                    setUserState={props.setUserState} />

            </Box>

            <Box 
                gridArea='main' 
                margin={{ top: headerOffset }}>
                <Grommet theme={tabTheme}>
                <Tabs>
                    <Tab title='Activity'>
                        <Box
                            style={{ 
                                overflowY: 'scroll', 
                                height: 'calc(100vh - 79px - 64px)' 
                            }}
                        >
                            <UserFeed targetUser={user} userState={props.userState} />
                            <Box align='center'>
                                <ProfileCreateBanner
                                    container={{ width: '70%' }}
                                    user={user} />
                            </Box>
                        </Box>
                    </Tab>

                    <Tab title='Questions'>
                        
                        <Box // Container for Grommet
                            style={{ 
                                overflowY: 'scroll', 
                                height: 'calc(100vh - 79px - 64px)' 
                            }}
                        >

                        <Grommet theme={tabPaneTheme}>
                            <Box // Container for cards
                                margin={{ vertical: 'small' }} 
                                align='center' 
                                gap='xsmall'
                            > 
                                { props.userState.id === user.id &&
                                    <Box
                                        hoverIndicator
                                        onClick={() => setQuestionFormOpen(true)}
                                        height={{ min: 'min-content' }}
                                        gap='small'
                                        width='85%'
                                        pad='small'
                                        round='small'
                                        direction='row'
                                    >
                                        <Add />
                                        <Text>Add a new question...</Text>
                                    </Box>
                                }
                                
                                { questions.length > 0 ? 
                                    questions.map( 
                                        e => <EntityCard 
                                                width='85%' 
                                                entity={e} 
                                                userState={props.userState} />
                                    )
                                    : 
                                    <NothingHereDisplay
                                        container={{
                                            width: '70%',
                                            pad: {
                                                vertical: 'medium'
                                            }
                                        }} />
                                    }
                                <ProfileCreateBanner
                                    container={{ width: '70%' }}
                                    user={user} />
                            </Box>

                        </Grommet>
                        </Box>

                    </Tab>

                    <Tab title='Services'>
                        <Box // Container for Grommet
                            style={{
                                overflowY: 'scroll',
                                height: 'calc(100vh - 79px - 64px)'
                            }}
                        >

                        <Grommet theme={tabPaneTheme}>
                            <Box // Container for cards
                                margin={{ vertical: 'small' }}
                                align='center'
                                gap='xsmall'
                            >

                                { props.userState.id === user.id && 
                                    <Box 
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

                                { services.length > 0 ?
                                    services.map(
                                        e => <EntityCard 
                                                width='85%' 
                                                entity={e} 
                                                userState={props.userState} />
                                    ) 
                                    : 
                                    <NothingHereDisplay 
                                        container={{ 
                                            width: '70%',
                                            pad: {
                                                vertical: 'medium'
                                            } 
                                        }} />
                                }

                                <ProfileCreateBanner 
                                    container={{ width: '70%' }} 
                                    user={user} />
                            </Box>

                        </Grommet>
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

                {/* Modal form for adding a new question */}
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

                {/* Modal form for adding a new service */}
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
