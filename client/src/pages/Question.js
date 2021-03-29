import { React, useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom';

import { Editor, EditorState, ContentState, convertFromRaw } from 'draft-js';

import Comment from '../components/Comment';
import Rating from '../components/Rating';
import Answer from '../components/Answer';
import PostEditor from '../components/PostEditor';
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
    Anchor
} from 'grommet';

import API from '../utils/API';
import UserWidget from '../components/UserWidget';
import TagDisplay from '../components/TagDisplay';

export default function Question(props) {
    const { id } = useParams();
    const history = useHistory();

    const emptyQuestionComment = {
        text: "",
        type: "question",
        ref: id
    };

    const [question, setQuestion] = useState({
        title: "",
        text: "",
        User: {},
        Tags: [],
    });

    const [answer, setAnswer] = useState({
        text: "",
        question: id
    });

    const [questionComment, setQuestionComment] = useState(emptyQuestionComment);

    const [questionComments, setQuestionComments] = useState([]);

    const [answers, setAnswers] = useState([]);

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const handleSubmit = async () => {
        if (answer) {
            await API.createAnswer(answer, props.userState.token).catch(err => console.log(err));

            setEditorState(EditorState.push(editorState, ContentState.createFromText('')));

            const newAnswers = await API.getAnswersByQuestion(id).catch(err => console.log(err));
            setAnswers(newAnswers.data);
        }
    }

    const handleAddQuestionComment = async (event) => {
        if (questionComment) {
            await API.createQuestionComment(questionComment, props.userState.token)
                .catch(err => console.log(err));

            const newQuestionComments = await API.getAllQuestionComments(id).catch(err => console.log(err));
            setQuestionComments(newQuestionComments.data);

            setQuestionComment(emptyQuestionComment);
        }
    }

    useEffect(async () => {
        const questionToShow = await API.getQuestionById(id).catch(err => console.log(err));
        setQuestion(questionToShow.data);
        setEditorState(
            EditorState.createWithContent(convertFromRaw(JSON.parse(questionToShow.data.text)))
        );

        const commentsToShow = await API.getAllQuestionComments(id).catch(err => console.log(err));;
        setQuestionComments(commentsToShow.data);

        const answerToShow = await API.getAnswersByQuestion(id).catch(err => console.log(err));;
        setAnswers(answerToShow.data);

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

    const handleCommentInput = (event) => {
        setQuestionComment({ ...questionComment, text: event.target.value });
    }

    const blockStyleFn = (contentBlock) => {
        if (contentBlock.getType() === 'code-block') {
            return 'codeBlockStyle';
        }
    }

    return (
        <Grommet theme={theme}>
            <Navbar userState={props.userState}/>
            <Box margin={{ bottom: '20px' }} align='center'>
                <Box margin={{ top: 79 + 15 + 'px' }} width='80%'>
                    { history.length > 0 &&  
                        <Anchor onClick={() => history.goBack()}>
                            &lt; Back
                        </Anchor> }
                    <Box height='3px' margin={{top: '5px'}} background='#222E42' />

                    <Box justify='between' align='center' direction='row'>
                        <Box align='center' direction='row'>
                            <Rating 
                                setAnswers={setAnswers} 
                                userState={props.userState} 
                                type='question' 
                                owner={question.User.id} 
                                reference={id}
                            />
                            <Box pad={{ bottom: '10px' }}>
                                <Heading fill 
                                    margin={{ vertical: '5px' }} 
                                    level={2}
                                >
                                    {question.title}
                                </Heading>
                                <TagDisplay tags={question.Tags} userState={props.userState} />
                            </Box>
                        </Box>

                        <UserWidget margin={{right: '15px'}} userState={question.User} />

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
                            blockStyleFn={blockStyleFn}/>
                    </Box>


                    <Heading 
                        margin={{ top: '0px', bottom: 'xsmall' }} 
                        level={3}
                    >
                            Comments
                    </Heading>

                    <Box height='3px' background='#222E42' />

                    <Box align='center'>
                        { questionComments.map( e => <Comment
                                                        user={e.User}
                                                        reference={e.id}
                                                        date={e.createdAt}
                                                        text={e.text} /> ) }

                        { props.userState.isSignedIn &&
                            <Accordion margin={{ top: '15px' }} width='85%'>
                                <AccordionPanel label='Leave a comment...'>
                                    <Box>
                                        <Form onSubmit={handleAddQuestionComment}
                                            value={questionComment.text}>
                                            <FormField htmlFor='text-area'
                                                onChange={handleCommentInput}
                                                component={TextArea}
                                                placeholder='Comment...'
                                                value={questionComment.text} />
                                            <Button type='submit' label='Submit' />
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
                            </Box>
                        }
                    </Box>

                    <Heading 
                        margin={{ top: 'medium', bottom: 'xsmall' }} 
                        level={3}
                    >
                        Answers
                    </Heading>

                    <Box height='3px' background='#222E42' />

                    <Box margin={{ vertical: '10px' }}>
                        { answers.map( e =>  <Answer
                                                setAnswers={setAnswers}
                                                userState={props.userState}
                                                answer={e} /> ) }
                    </Box>

                    { props.userState.isSignedIn &&
                        <Box fill>
                            <Heading
                                level={3}
                                margin={{ top: 'medium', bottom: 'xsmall' }}
                            >
                                Submit an answer
                            </Heading>

                            <Box height='3px' background='#222E42' margin={{ bottom: 'small' }} />

                            <PostEditor
                                getDraftValue={
                                    (value) => setAnswer({ ...answer, text: JSON.stringify(value) })
                                }
                                controlledContent={answer.text} />

                            <Box height='10px' />

                            <Button label='Submit' onClick={handleSubmit} />
                        </Box>
                    }

                    { !props.userState.isSignedIn &&
                        <Box pad='small' margin={{ top: 'xsmall' }}
                            align='center' round='small' fill background='rgba(0,0,0,0.2)'>
                            <Link to='/splash'>
                                <Text pad='small'>Sign In or Sign Up to submit an answer!</Text>
                            </Link>
                        </Box>
                    }

                </Box>
            </Box>
        </Grommet>
    )
}