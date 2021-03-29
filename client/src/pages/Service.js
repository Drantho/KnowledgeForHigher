import { React, useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom';

import { Editor, EditorState, convertFromRaw } from 'draft-js';

import Comment from '../components/Comment';
import Rating from '../components/Rating';
import Navbar from '../components/Navbar';

import {
    Box,
    Button,
    Heading,
    Accordion,
    AccordionPanel,
    Text,
    TextArea,
    Form,
    FormField,
    Grommet,
    Anchor,
    Tip
} from 'grommet';

import API from '../utils/API';
import messageAPI from '../utils/messageAPI';
import UserWidget from '../components/UserWidget';
import TagDisplay from '../components/TagDisplay';

export default function Question(props) {
    const { id } = useParams();
    const history = useHistory();

    const [service, setService] = useState({
        title: "",
        text: "",
        price: '',
        User: {},
        Tags: [],
    });

    const [newComment, setNewComment] = useState({
        text: '',
        type: 'service',
        ref: id
    });

    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());
    const [comments, setComments] = useState([]);

    const handleSubmitComment = async (event) => {

        if (newComment) {
            await API.createQuestionComment(newComment, props.userState.token)
                .catch(err => console.log(err));

            const newQuestionComments 
                = await API.getAllQuestionComments(id).catch(err => console.log(err));

            setComments(newQuestionComments.data);
            setNewComment({
                text: '',
                type: 'service',
                ref: id
            });
        }
    }

    useEffect(async () => {
        const serviceToShow = await API.getServiceById(id).catch(err => console.log(err));
        setService(serviceToShow.data);
        setEditorState(
            EditorState.createWithContent(convertFromRaw(JSON.parse(serviceToShow.data.text)))
        );

        const commentsToShow = await API.getAllServiceComments(id).catch(err => console.log(err));;
        setComments(commentsToShow.data);

        const ratingToShow = await API.getRating(id, "service").catch(err => console.log(err));;


    }, []);

    const theme = {
        global: {
            colors: {
                focus: undefined
            }
        },
        accordion: {
            border: undefined,
            heading: {
                margin: {
                    vertical: '10px'
                }
            }
        },
        formField: {
            border: undefined
        },
        textArea: {
            extend: `
                margin-top: 4px;
                border: 1px solid #222E42;
                border-radius: 3px
            `
        }        
    }

    const buttonTheme = {
        button: {
            border: { color: '#FCE181' },
            primary: {
                color: '#FCE181',
                border: { color: '#FCE181' }
            },
            size: {
                medium: {
                    border: {
                        radius: '8px'
                    }
                }
            },
            extend: `
                height: 60px;
                width: 80%
            `
        }
    }

    const handleCommentInput = (event) => {
        setNewComment({ ...newComment, text: event.target.value });
    }

    const blockStyleFn = (contentBlock) => {
        if (contentBlock.getType() === 'code-block') {
            return 'codeBlockStyle';
        }
    }

    const handleMessage = async (event) => {
        event.preventDefault();
        const newThread
            = await messageAPI.createThread(service.userName, props.userState.token);
        console.log(newThread)
        history.push(`/messages/${newThread.data.id}`)
    }

    return (
        <Grommet theme={theme}>
            <Navbar userState={props.userState} />
            <Box margin={{ bottom: '20px' }} align='center'>
                <Box margin={{ top: 79 + 15 + 'px' }} width='80%'>

                    { history.length > 0 &&
                        <Anchor onClick={() => history.goBack()}>
                            &lt; Back
                        </Anchor> }

                    <Box height='3px' margin={{ top: '5px' }} background='#222E42' />

                    <Box justify='between' align='center' direction='row'>
                        <Box align='center' direction='row'>
                            <Rating
                                userState={props.userState}
                                type='service'
                                owner={service.User.id}
                                reference={id}
                            />
                            <Box pad={{ bottom: '10px' }}>
                                <Heading fill
                                    margin={{ vertical: '5px' }}
                                    level={2}
                                >
                                    {service.title}
                                </Heading>
                                <TagDisplay tags={service.Tags} userState={props.userState} />
                            </Box>
                        </Box>

                        <Box gap='medium' align='center' direction='row'>
                            <Tip plain
                                content={
                                    <Box 
                                        pad='xsmall'
                                        round='xsmall'
                                        background='#FCE181'
                                        width={{ max: '90px' }}
                                    >
                                        <Text size='12px'>
                                            Prices are estimates and may not represent the total cost for this service.
                                        </Text>
                                    </Box>}>
                                <Text color='#222e42' weight='bold'>{service.price}</Text>
                            </Tip>
                            <UserWidget margin={{ right: '15px' }} userState={service.User} />
                        </Box>


                    </Box>

                    <Box height='3px' background='#222E42' />

                    <Box
                        pad={{ vertical: '30px', horizontal: '15px' }}
                        margin={{ horizontal: 'medium', top: '0px' }}
                        round='small'
                        className='display-only'
                    >
                        <Editor
                            editorState={editorState}
                            readOnly={true}
                            blockStyleFn={blockStyleFn} />
                    </Box>
                    
                    { props.userState.id !== service.User.id && 
                        <Button 
                            onClick={handleMessage}
                            label={`Contact ${service.User.userName} about this service`} />
                    }

                    <Heading
                        margin={{ top: '0px', bottom: 'xsmall' }}
                        level={3}
                    >
                        Comments
                    </Heading>

                    <Box height='3px' background='#222E42' />

                    <Box align='center'>
                        { comments.map(e => <Comment
                                                user={e.User}
                                                reference={e.id}
                                                date={e.createdAt}
                                                text={e.text} />) }

                        { props.userState.isSignedIn &&
                            <Accordion margin={{ top: '15px' }} width='85%'>
                                <AccordionPanel label='Leave a comment...'>
                                    <Box>
                                        <Form
                                            onSubmit={handleSubmitComment}
                                            value={newComment.text}
                                        >
                                            <FormField htmlFor='text-area'
                                                onChange={handleCommentInput}
                                                component={TextArea}
                                                placeholder='Comment...'
                                                value={newComment.text} />
                                            <Grommet theme={buttonTheme}>
                                            <Box align='center'>
                                                <Button 
                                                    primary 
                                                    disabled={newComment.text === ''} 
                                                    type='submit' 
                                                    label='Submit' />
                                            </Box>
                                            </Grommet>
                                        </Form>
                                    </Box>
                                </AccordionPanel>
                            </Accordion> }

                        { !props.userState.isSignedIn &&
                            <Box
                                pad='small'
                                margin={{ top: 'xsmall' }}
                                align='center'
                                round='small'
                                fill
                                background='rgba(0,0,0,0.2)'
                            >
                                <Link to='/splash'>
                                    <Text pad='small'>
                                        Sign In or Sign Up to leave a comment!
                                    </Text>
                                </Link>
                            </Box> }
                    </Box>

                </Box>
            </Box>
        </Grommet>
    )
}