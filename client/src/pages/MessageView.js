import { React, useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import {Box,
        Nav, 
        Button, 
        Grommet, 
        Heading, 
        Form, 
        TextInput } from 'grommet';
import {Add} from 'grommet-icons';

import ThreadListItem from '../components/ThreadListItem';
import ThreadView from '../components/ThreadView';
import Navbar from '../components/Navbar';

import messageAPI from '../utils/messageAPI';

export default function MessageView(props) {

    const { threadId } = useParams();

    const [ threadsList, setThreadsList ] = useState([]);
    const [ selectedThread, setSelectedThread ] = useState({
        id: -1,
        toUser: -1
    });
    const [ usersList, setUsersList ] = useState([]);
    const [ newThreadState, setNewThreadState ] = useState({ username: '' });

    const handleThreadSelect = (id, toUser) => {
        setSelectedThread({ id, toUser });
    }

    const handleNewThread = async (event) => {
        event.preventDefault();
        const value = event.value ? event.value : event.suggestion.value;
        const newThread = await messageAPI.createThread(value, props.userState.token);

        setNewThreadState({username: ''});

        const threadData = {...(newThread.data.thread), user1: null, user2: newThread.data.user}
        if (newThread.data.thread.id) {
            setThreadsList([...threadsList, threadData]);
        } else {
            console.log(newThread);
        }
    }

    const handleNewThreadChange = async (event) => {
        setNewThreadState({username: event.target.value});
        if (event.target.value !== '') {
            const searchedUsers 
                = await messageAPI.searchUsers(event.target.value, props.userState.token);
            const data = searchedUsers.data;
            const idx = searchedUsers.data.findIndex( e => e.id === props.userState.id);
            if (idx !== -1) {
                data.splice(idx, 1)
            }
            setUsersList(data);
        }
    }

    useEffect( async () => {
        setNewThreadState({username: ''});
        const loadThreadsList = (await messageAPI.getThreads(props.userState.token)).data;
        setThreadsList(loadThreadsList);

        if (threadId) {
            const thread = loadThreadsList.find(e => e.id === parseInt(threadId))
            setSelectedThread({
                id: parseInt(threadId),
                toUser: (thread.user1 || thread.user2)
            });
        }
    }, []);


    // Override Grommet theming
    const customTheme = {
        global: {
            drop: {
                border: {
                    radius: '10px'
                },
                extend: {
                    backgroundColor: 'rgb(137,162,178)'
                }
            },
            focus: {
                border: {
                    color: 'rgba(0,0,0,0)' // Hacky way to remove focus highlighting
                }
            }
        }
    }

    return (
        <Grommet theme={customTheme}>
        <Navbar userState={props.userState} />
        <Box fill pad={{top: '74px'}} direction='row' height={{ min: '100vh' }}>

            <Nav 
                elevation='large' 
                gap='none' 
                width='300px'
                background='#222E42'
            >
                <Heading 
                    level={3} 
                    color='#FCE181' 
                    margin={{'horizontal': 'small'}}
                >
                    Messages
                </Heading>

                <Box background='#FCE181' height='3px' />
                
                <Form onSubmit={handleNewThread} value={newThreadState.username}>
                    <Box direction='row' align='center' pad='small'>
                        <TextInput
                            placeholder='New conversation' 
                            onChange={handleNewThreadChange}
                            value={newThreadState.username}
                            pad={{'horizontal': 'xsmall'}}
                            suggestions={usersList.map(e => ({ label: `${e.firstName} ${e.lastName} (${e.userName})`, value: e.userName}))}
                            onSuggestionSelect={handleNewThread}
                            dropProps={{
                                stretch: false,
                                background: '#222E42'
                            }} />

                        <Button margin='small' type='submit'><Add /></Button>
                    </Box>
                </Form>
                <Box background='#FCE181' height='3px' margin={{bottom: 'small'}}></Box>
                { threadsList.map( (e) => {
                    return <ThreadListItem
                                userState={props.userState}
                                toUser={e.user1 ? e.user1 : e.user2} 
                                key={e.id} 
                                threadId={e.id}
                                active={selectedThread.id === e.id}
                                onClick={ (id, toUser) => setSelectedThread({ id, toUser }) }
                            />
                }) }
            </Nav>

            <ThreadView 
                userState={props.userState} 
                toUser={selectedThread.toUser} 
                selectedThread={selectedThread.id}/>
        </Box>
        </Grommet>
    )
}
