import { React, useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import { 
    Accordion, 
    AccordionPanel, 
    Box, 
    Grommet,
    Form,
    FormField,
    TextArea,
    Button
} from 'grommet';

import Rating from './Rating';
import Comment from './Comment';
import UserWidget from './UserWidget';

import API from '../utils/API';

export default function Answer(props) {

    const theme = {
        global: {
            colors: {
                focus: undefined
            }
        },
        formField: {
            border: undefined
        },
        accordion: {
            border: undefined,
            icons: {
                expand: undefined,
                collapse: undefined
            }
        }
    }
    
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    useEffect( () => {
        API.getAnswerComments(props.answer.id, props.userState.token)
            .then( (result) => {
                setComments(result.data);
            }).catch( (err) => {
                console.log(err);
            });

        setEditorState(
            EditorState.createWithContent(convertFromRaw(JSON.parse(props.answer.text)))
        );
    }, []);

    const handleCommentInput = (event) => {
        setNewComment(event.target.value);
    }

    const handleSubmitComment = (event) => {
        console.log(event);
        API.createAnswerComment({
            text: newComment,
            type: 'answer',
            ref: props.answer.id
        }, props.userState.token).then( (result) => {
            setNewComment()
            console.log(result);
        }).catch( (err) => {
            console.log(err);
        });
    }

    return (
        <Grommet theme={theme}>
        <Accordion>
            <AccordionPanel 
                label={
                    <Box 
                        pad='xsmall'
                        margin={{ vertical: '5px' }} 
                        fill 
                        className='answer-display' 
                        direction='row'
                        align='center'
                        round='small'
                        style={{ boxShadow: 'inset 0 0 4px #222E42' }}
                    >
                        <Rating 
                            setAnswers={props.setAnswers}
                            reference={props.answer.id} 
                            type='answer'
                            owner={props.answer.UserId}
                            userState={props.userState} />
                        <Editor editorState={editorState} readOnly={true}/>
                        <UserWidget margin={{ right: '10px' }} userState={props.answer.User} />
                    </Box>
                }>
                <Box width='85%' justify='center' alignSelf='center'>
                    {comments.map((e) => {
                        return <Comment
                                    user={e.User}
                                    reference={e.id}
                                    date={e.createdAt}
                                    text={e.text} />
                    })}

                    <Box margin={{ bottom: 'small' }}>
                        <Form onSubmit={handleSubmitComment}
                            value={newComment}>
                            <FormField htmlFor='text-area'
                                onChange={handleCommentInput}
                                component={TextArea}
                                placeholder='Leave a comment on this answer...'
                                value={newComment} />
                            <Button type='submit' label='Submit' />
                        </Form>
                    </Box>
                </Box>
            </AccordionPanel>
        </Accordion>
        </Grommet>
    )
}
