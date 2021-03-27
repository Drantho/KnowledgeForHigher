import { React, useState, useEffect } from 'react';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import { 
    Accordion, 
    AccordionPanel, 
    Box, 
    Grommet, 
    Text,
    Form,
    FormField,
    TextArea,
    Button
} from 'grommet';

import Rating from './Rating';
import Comment from './Comment';

import API from '../utils/API';

export default function Answer(props) {

    
    const theme = {
        global: {
            colors: {
                focus: undefined
            }
        },
        accordion: {
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
        console.log('Helloooooo');
        console.log(props)
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
                    <Box fill direction='row' border='bottom'>
                        <Rating setAnswers={props.setAnswers}
                            reference={props.answer.id} type='answer'
                            userState={props.userState} />
                        <Editor editorState={editorState} readOnly={true}/>
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

                    <Accordion margin={{ top: '15px' }} width='85%'>
                        <AccordionPanel label='Leave a comment...'>
                            <Box>
                                <Form onSubmit={handleSubmitComment}
                                    value={newComment}>
                                    <FormField htmlFor='text-area'
                                        onChange={handleCommentInput}
                                        component={TextArea}
                                        placeholder='Comment...'
                                        value={newComment} />
                                    <Button type='submit' label='Submit' />
                                </Form>
                            </Box>
                        </AccordionPanel>
                    </Accordion>
                </Box>
            </AccordionPanel>
        </Accordion>
        </Grommet>
    )
}
