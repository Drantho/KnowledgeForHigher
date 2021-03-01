import { React, useState, useEffect } from 'react';
import { Text, TextArea, Form, FormField, Button, Box, Heading } from 'grommet';

import MessageBubble from './MessageBubble';

import messageAPI from '../utils/messageAPI';

export default function ThreadView(props) {

    const [messagesList, setMessagesList] = useState([]);

    const [newMsg, setNewMsg] = useState({newMsg: ''});

    const handleSend = async (event) => {
        event.preventDefault();
        if (newMsg.newMsg === '' || newMsg.newMsg === null) {
            console.log('empty message');
            return;
        }

        const data = {
            recipientId: props.toUser.id,
            ThreadId: props.selectedThread,
            body: newMsg.newMsg
        }

        setMessagesList([...messagesList, {...data, senderId: props.userState.id}]);
        await messageAPI.sendMessage(data, props.userState.token);
        setNewMsg({newMsg: ''});
    }

    const handleChange = (event) => {
        setNewMsg({newMsg: event.target.value});
    }

    useEffect( async () => {
        const messages 
            = (await messageAPI.getThreadMessages(props.selectedThread, props.userState.token)).data;
        setMessagesList(messages.reverse());
    }, [props.selectedThread]);

    return (
            <Box background={{color: '#939393', opacity:'weak'}} width='100%'>
                {props.selectedThread !== -1 ? 
                <>
                <Box elevation='none' align='end' background={{ color: 'rgba(137,162,178,0.6)' }}>
                <Heading textAlign='end' 
                    level={2} 
                    margin={{vertical:'small', right: 'small'}}>
                    Conversation with {props.toUser.firstName + ' ' + props.toUser.lastName}
                </Heading>
                </Box>
                <Box 
                    margin={{horizontal: 'small', bottom: 'small'}} 
                    height={{max: '500px'}} 
                    overflow={{vertical: 'scroll'}}>
                    {messagesList.map( (e) => {
                        return props.selectedThread ? <MessageBubble 
                        sentOrRecieved={e.senderId === props.userState.id ? 'sent' : 'received'}
                        body={e.body} 
                        date={e.createdAt}/> : <></>
                    })}
                </Box>

                <Box>
                    <Form value={newMsg.newMsg}
                        onSubmit={handleSend}>
                        <Box direction='row' margin={{'horizontal': 'medium'}}>
                            <TextArea 
                                type='submit'
                                margin={{'horizontal': 'small'}}
                                name='message'
                                onChange={handleChange}
                                placeholder='Message...'
                                value={newMsg.newMsg}/>
                            <Box justify='center' align='center'>
                                <Button 
                                    margin={{'horizontal': 'small'}}
                                    height='small'
                                    type='submit' 
                                    primary 
                                    label='Send'/>
                            </Box>
                        </Box>
                    </Form>
                    </Box>
                    </> : 
                    <>
                    <Box justify='center' align='center'>
                        <Heading color='#5A6489'>Select a thread</Heading>
                    </Box>
                    </>}
            </Box>
    )
}
