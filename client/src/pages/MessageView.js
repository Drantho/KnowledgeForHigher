import { React, useState, useEffect }  from 'react';
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

    const handleNewThread = async (event) => {
        event.preventDefault();
        const newThread = await messageAPI.createThread(event.value, props.userState.token);

        setNewThreadState({username: ''});
        console.log(newThread);
        const threadData = {...(newThread.data.thread), user1: null, user2: newThread.data.user}
        if (newThread.data.thread.id) {
            setThreadsList([...threadsList, threadData]);
        } else {
            console.log(newThread);
        }
    }

    const handleNewThreadChange = (event) => {
        setNewThreadState({username: event.target.value});
    }

    useEffect( async () => {
        setNewThreadState({username: ''});
        const loadThreadsList = (await messageAPI.getThreads(props.userState.token)).data;
        console.log(loadThreadsList);
        setThreadsList(loadThreadsList);
    }, []);

    return (
        <Grommet>
        <Box fill direction='row' height={{ min: '60vh' }}>
            <Nav gap='none' width='25%' background='#222E42'>
                <Heading 
                    level={3} 
                    color='#FCE181' 
                    margin={{'horizontal': 'small'}}>
                        Messages
                    </Heading>
                <Form onSubmit={handleNewThread} value={newThreadState.username}>
                    <Box direction='row' pad='small' margin={{'bottom': 'small'}}>
                        <TextInput 
                            placeholder='Create thread' 
                            onChange={handleNewThreadChange}
                            value={newThreadState.username}
                            pad={{'horizontal': 'xsmall'}}>
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
                            active={selectedThread.id === e.id ? true : false}
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
