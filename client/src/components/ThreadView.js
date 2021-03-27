import { React, useState, useEffect, useRef } from 'react';
import { Text, TextArea, Form, FormField, Button, Box, Heading, Anchor } from 'grommet';

import {
    Editor,
    EditorState,
    ContentState,
    SelectionState,
    RichUtils,
    Modifier,
    convertToRaw
} from 'draft-js';

import MessageBubble from './MessageBubble';

import messageAPI from '../utils/messageAPI';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import { useHistory } from 'react-router';

export default function ThreadView(props) {

    const history = useHistory();

    const [messagesList, setMessagesList] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const handleSend = async (event) => {
        event.preventDefault();
        if (editorState.getCurrentContent().getPlainText() === '') {
            return;
        }

        const data = {
            recipientId: props.toUser.id,
            ThreadId: props.selectedThread,
            body: editorState.getCurrentContent().getPlainText()
        }

        setMessagesList([...messagesList, {...data, senderId: props.userState.id}]);
        scrollToBottom();
        await messageAPI.sendMessage(data, props.userState.token);

        const clearedEditorState = EditorState.push(editorState, ContentState.createFromText(''));
        setEditorState( clearedEditorState );
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    useEffect( async () => {
        const messages 
            = (await messageAPI.getThreadMessages(props.selectedThread, props.userState.token)).data;
        setMessagesList(messages.reverse());
        scrollToBottom();
    }, [props.selectedThread]);

    const onChange = (newEditorState) => {
        setEditorState(newEditorState);
    }

    const handleReturn = (event) => {
        if (isSoftNewlineEvent(event)) {
            return 'handled';
        }
        handleSend(event);
    }

    return (
        <Box justify='between' background={{color: '#939393', opacity:'weak'}} width='100%'>
                {props.selectedThread !== -1 ? 
                <>

                <Box 
                    elevation='none' 
                    align='end' 
                    background={{ color: 'rgba(137,162,178,0.6)' }}
                >
                    <Heading textAlign='end' 
                        level={2} 
                        margin={{vertical:'small', right: 'small'}}>
                        Conversation with <Anchor 
                                            onClick={() => history.push(`/profile/${props.toUser.id}`) }
                                          >
                                            {props.toUser.firstName + ' ' + props.toUser.lastName}
                                          </Anchor>
                    </Heading>
                </Box>

                <Box 
                    flex='grow' 
                    overflow={{vertical: 'scroll'}}
                    pad='medium'
                    gap='xsmall'
                >
                    { messagesList.map( (e) => {
                        return props.selectedThread && 
                            <MessageBubble 
                                sentOrRecieved={e.senderId === props.userState.id ? 
                                                    'sent' : 'received'}
                                body={e.body} 
                                date={e.formattedDate} 
                                portrait={props.toUser.portrait} />
                    }) }
                    <div ref={messagesEndRef} />
                </Box>

                <Box margin={{vertical: '10px'}}>
                    <Form value={editorState.getCurrentContent().getPlainText()}
                        onSubmit={handleSend}>
                        <Box align='center' direction='row' margin={{'horizontal': 'medium'}}>
                            <Box fill round='small'
                                pad='small'
                                className='message-editor'
                            >
                                <Editor 
                                    onChange={onChange} 
                                    editorState={editorState}
                                    placeholder='Enter a message...'
                                    handleReturn={handleReturn} />
                            </Box>

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
                <Box justify='center' align='center'>
                    <Heading color='#5A6489'>Select a thread</Heading>
                </Box>
                }
            </Box>
    )
}
