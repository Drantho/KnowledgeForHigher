import { React, useState, useEffect } from 'react';
import { TextInput, TextArea, Form, FormField, Button, Box, Heading } from 'grommet';

import MessageBubble from './MessageBubble';

import messageAPI from '../utils/messageAPI';

export default function ThreadView(props) {

    const [messagesList, setMessagesList] = useState([]);

    const [newMsg, setNewMsg] = useState({newMsg: ''});

    const handleSend = async (event) => {
        event.preventDefault();
        console.log(newMsg.newMsg);
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
        const messages = (await messageAPI.getThreadMessages(props.selectedThread, props.userState.token)).data;
        console.log(messages);
        setMessagesList(messages);
    }, [props.selectedThread]);

    return (
            <Box pad='small' width='100%'>
                <Heading textAlign='center' level={2}>Messages with {props.toUser.firstName + ' ' + props.toUser.lastName}</Heading>

                {messagesList.map( (e) => {
                    return props.selectedThread ? <MessageBubble 
                                sentOrRecieved={e.senderId === props.userState.id ? 'sent' : 'received'}
                                body={e.body} 
                                date={e.createdAt}/> : <></>
                })}

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
            </Box>
    )
}
