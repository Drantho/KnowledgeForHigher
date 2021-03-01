import { React, useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import {Box, Text, List, Nav, Button, Grommet, Heading, Form, TextInput} from 'grommet';
import {Add} from 'grommet-icons';

import ThreadListItem from '../components/ThreadListItem';
import ThreadView from '../components/ThreadView';

import messageAPI from '../utils/messageAPI';

export default function MessageView(props) {

    const [threadsList, setThreadsList] = useState([]);
    const [selectedThread, setSelectedThread] = useState({
        id: -1,
        toUser: -1
    });

    const [newThreadState, setNewThreadState] = useState({username: ''});

    const handleThreadSelect = (id, toUser) => {
        setSelectedThread({ id, toUser });
    }

    const handleNewThread = (event) => {
        event.preventDefault();
        console.log(event.value);
        const newThread = messageAPI.createThread();
        setNewThreadState({username: ''});
        setThreadsList([...threadsList]);
    }

    const handleNewThreadChange = (event) => {
        setNewThreadState({username: event.target.value});
    }

    useEffect( async () => {
        setNewThreadState({username: ''})
        console.log(props.userState.id);
        const loadThreadsList = (await messageAPI.getThreads(props.userState.token)).data;
        setThreadsList(loadThreadsList);
        console.log(loadThreadsList);
    }, []);

    return (
        <Grommet>
        <Box fill direction='row'>
            <Nav gap='none' pad='small' width='25%' background='#222E42'>
                <Heading level={3} color='#FCE181'>Messages</Heading>
                <Form onSubmit={handleNewThread} value={newThreadState.username}>
                    <Box direction='row'>
                        <TextInput 
                            placeholder='Create thread' 
                            onChange={handleNewThreadChange}
                            value={newThreadState.username}>
                        </TextInput>
                        <Button margin='small' type='submit'><Add></Add></Button>
                    </Box>
                </Form>
                {threadsList.map( (e) => {
                    return <ThreadListItem
                            userState={props.userState}
                            toUser={e.user1 ? e.user1 : e.user2} 
                            key={e.id} 
                            threadId={e.id} 
                            onClick={handleThreadSelect}
                        />
                })}
            </Nav>

            <ThreadView 
                userState={props.userState} 
                toUser={selectedThread.toUser} 
                selectedThread={selectedThread.id}/>
        </Box>
        </Grommet>
    )
}
