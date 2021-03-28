import { React, useState, useEffect } from 'react';
import { Form, Button, Box, Heading, Anchor, Text, Stack } from 'grommet';

import io from 'socket.io-client';

import {
    Editor,
    EditorState,
    ContentState
} from 'draft-js';

import MessageBubble from './MessageBubble';

import messageAPI from '../utils/messageAPI';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import { useHistory } from 'react-router';
import NothingHereDisplay from './NothingHereDisplay';

const ENDPOINT = 'localhost:3001';
let socket = io(ENDPOINT);

export default function ThreadView(props) {
    
    const history = useHistory();
    
    const [ messagesList, setMessagesList ] = useState([]);
    const [ editorState,  setEditorState ]  = useState(EditorState.createEmpty());
    const [ typingState,  setTypingState ]  = useState(false);

    useEffect( async () => {
        const messages 
            = (await messageAPI.getThreadMessages(props.selectedThread, props.userState.token)).data;
        setMessagesList(messages);

        socket.on('connect', data => {
            socket.emit('join', props.selectedThread);
        });

        socket.on('newMessage', async data => {
            setMessagesList(
                (await messageAPI.getThreadMessages(props.selectedThread, props.userState.token)).data
            );
        });

        let prevTimer;
        socket.on( `typing-${props.selectedThread}-${props.toUser.id}`, () => {
            setTypingState(true);
            clearTimeout(prevTimer);
            prevTimer = setTimeout(() => setTypingState(false), 3000);
        });

        return function cleanup() {
            socket.emit('disconnect');
            socket.off();
        }

    }, [props.selectedThread, ENDPOINT]);

    const handleSend = async (event) => {
        event.preventDefault();
        if (editorState.getCurrentContent().getPlainText() === '') {
            return;
        }

        const data = {
            senderId: props.userState.id,
            recipientId: props.toUser.id,
            ThreadId: props.selectedThread,
            body: editorState.getCurrentContent().getPlainText()
        }
        socket.emit('message', data);

        const clearedEditorState = EditorState.push(editorState, ContentState.createFromText(''));
        setEditorState( clearedEditorState );
    }

    const handleReturn = (event) => {
        if (isSoftNewlineEvent(event)) {
            return 'handled';
        }
        handleSend(event);
    }

    const handleKeyDown = (event) => {
        socket.emit('typing', { thread: props.selectedThread, sender: props.userState.id });
    }

    return (
        <Box 
            style={{ height: 'calc(100vh - 79px)' }} 
            justify='between' 
            background={{color: '#939393', opacity:'weak'}} 
            width='100%'
        >
                { props.selectedThread !== -1 ? 
                <>

                <Box 
                    elevation='none' 
                    align='end' 
                    background={{ color: 'rgba(137,162,178,0.6)' }}
                    pad={{ top: 'small', bottom: '18px'}}
                >
                    <Heading textAlign='end' 
                        level={2} 
                        margin={{vertical: '0px', right: 'small'}}
                        pad='small'    
                    >
                        Conversation with <Anchor 
                                            onClick={ () => history.push(`/profile/${props.toUser.id}`) }
                                          >
                                            {props.toUser.firstName + ' ' + props.toUser.lastName}
                                          </Anchor>
                    </Heading>
                </Box>

                <Box
                    style={{ height: 'calc(100vh - 74px)' }}
                    overflow={{vertical: 'scroll'}}
                    pad='medium'
                    gap='xsmall'
                    direction='column-reverse'
                >
                    { messagesList.length > 0 ? 
                        messagesList.map( (e) => {
                            return props.selectedThread && 
                                <MessageBubble 
                                    key={e.id}
                                    sentOrRecieved={e.senderId === props.userState.id ? 
                                                        'sent' : 'received'}
                                    body={e.body} 
                                    date={e.formattedDate}
                                    showPortrait={e.showPortrait} 
                                    portrait={props.toUser.portrait} />
                        })
                        :
                        <NothingHereDisplay /> }
                </Box>

                <Box margin={{vertical: '10px'}}>
                    <Form 
                        value={editorState.getCurrentContent().getPlainText()}
                        onSubmit={handleSend}
                    >
                        <Box 
                            align='center' 
                            direction='row' 
                            margin={{'horizontal': 'medium'}}
                        >
                            <Box 
                                fill 
                                round='small'
                                pad='small'
                                className='message-editor'
                            >
                                <Stack anchor='top-left'>
                                    <Editor 
                                        keyBindingFn={handleKeyDown}
                                        placeholder='Write your message here...'
                                        onChange={ (newState) => setEditorState(newState) } 
                                        editorState={editorState}
                                        handleReturn={handleReturn} />
                                    { typingState && 
                                        <Box margin={{ top: '-25px' }}>
                                            <Text size='12pt'>
                                                {`${props.toUser.userName} is typing...`}
                                            </Text>
                                        </Box> }
                                    
                                </Stack>
                            </Box>

                            <Box justify='center' align='center'>
                                <Button 
                                    margin={{'horizontal': 'small'}}
                                    height='small'
                                    type='submit' 
                                    primary 
                                    label='Send' />
                            </Box>
                        </Box>
                    </Form>
                </Box>
                </> : 
                <Box justify='center' align='center'>
                    <Heading color='#5A6489'>Select a thread</Heading>
                </Box>
                }
            </Box>
    )
}
