import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

import Comment from '../components/Comment';
import Rating from '../components/Rating';
import Answer from '../components/Answer';
import Tag from '../components/Tag';

import { Box,
         Button, 
         Heading, 
         Accordion, 
         AccordionPanel, 
         Anchor, 
         Avatar, 
         Grid, 
         Text,
         TextArea,
         Form,
         FormField,
         Grommet } from 'grommet';

import API from '../utils/API';

export default function Question(props) {
    const { id } = useParams();

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

    const [tags, setTags] = useState([]);

    const [ratings, setRatings] = useState({});

    const handleSubmit = async () => {

        if (answer) {

            await API.createAnswer(answer, props.userState.token).catch(err => console.log(err));

            setAnswer({ ...answer, text: "" });

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

        const commentsToShow = await API.getAllQuestionComments(id).catch(err => console.log(err));;
        setQuestionComments(commentsToShow.data);

        const answerToShow = await API.getAnswersByQuestion(id).catch(err => console.log(err));;
        setAnswers(answerToShow.data);

        const ratingToShow = await API.getRating(id, "question").catch(err => console.log(err));;
        setRatings(ratingToShow.data);

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

    const descriptionBoxTheme = {
        box: {
            extend: `
                border: 1px solid #d6bf6d;
                border-bottom: 4px solid #d6bf6b;
                border-radius: 10px;`
        }
    }

    const handleCommentInput = (event) => {
        setQuestionComment({...questionComment, text: event.target.value});
    }

    const handleAnswerInput = (event) => {
        setAnswer({...answer, text: event.target.value})
    }
    
    return (
        <Grommet theme={theme}>
        <Box margin={{top: '100px', bottom: '20px'}} align='center'>
            <Box width='80%'>

            <Box height='3px' background='#222E42' />

            <Box justify='between' align='center' direction='row'>
                <Box align='center' direction='row'>
                    <Rating setAnswers={setAnswers} userState={props.userState}
                        type='question' reference={id} />
                    <Box pad={{bottom: '10px'}}>
                        <Heading fill margin={{top: '10px'}} level={2}>{question.title}</Heading>
                        <Box direction='row'>
                            {question.Tags.map( e => <Tag tag={e} userState={props.userState}/> )}
                        </Box>
                    </Box>
                </Box>
                
                <Box fill width={{max: '180px', min: '180px'}}
                  background='#FCE181' 
                  border={{
                    color: '#d6bf6d'
                  }}
                  round='small'
                  align='center' 
                  direction='row'>
                    <Box margin={{left: '20px'}} align='end'>
                        <Text size='small'>{question.User.userName}</Text>
                        <Text size='small'>{question.User.firstName + ' ' + question.User.lastName}</Text>
                    </Box>
                    <Link to={`/users/${question.User.id}`}>
                        <Avatar
                            margin='small'
                            size='40px'
                            src={`https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/${question.User.portrait}.png`} />
                    </Link>
                </Box>
                
            </Box>
            <Box height='3px' background='#222E42' />

            <Grommet theme={descriptionBoxTheme}>
            <Box pad={{vertical: '30px', horizontal: '15px'}}
                background='rgba(252,225,129,0.8)'
                round='small'
                margin={{horizontal: 'large', top: '20px'}}>
                <Text color='#222E42' size='large'>{question.text}</Text>
            </Box>
            </Grommet>


            <Heading margin={{top: 'medium', bottom: 'xsmall'}} level={3}>Comments</Heading>
            <Box height='3px' background='#222E42' />
            <Box align='center'>
                {questionComments.map( (e) => {
                    return <Comment   
                                user={e.User} 
                                reference={e.id} 
                                date={e.createdAt} 
                                text={e.text}/>
                })}

                {(props.userState.id !== question.User.id && props.userState.isSignedIn) && 
                <Accordion margin={{top: '15px'}} width='85%'>
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
                </Accordion>}

                {!props.userState.isSignedIn && 
                    <Box pad='small' margin={{top: 'xsmall'}} 
                        align='center' round='small' fill background='rgba(0,0,0,0.2)'>
                    <Link to='/splash'>
                        <Text pad='small'>Sign In or Sign Up to leave a comment!</Text>
                    </Link>
                    </Box>
                }
            </Box>

            <Heading margin={{ top: 'medium', bottom: 'xsmall' }} level={3}>Answers</Heading>
            <Box height='3px' background='#222E42' />
            <Box margin={{top: '10px'}}> 
                {
                    answers.map( (e) => {
                        return <Answer
                                    setRatings={setRatings}
                                    setAnswers={setAnswers}
                                    userState={props.userState} 
                                    answer={e}/>
                    })
                }
            </Box>
            
            {(props.userState.id !== question.User.id && props.userState.isSignedIn) && 
            <Box>

                <Heading margin={{ top: 'medium', bottom: 'xsmall' }} level={3}>Submit an answer</Heading>
                <Box height='3px' background='#222E42' />
                <Form onSubmit={handleSubmit} value={answer.text}>
                    <FormField htmlFor='text-area'
                        onChange={handleAnswerInput}
                        component={TextArea}
                        placeholder='Answer...'
                        value={answer.text} />
                    <Button type='submit' label='Submit' />
                </Form>

            </Box>}

            {!props.userState.isSignedIn &&
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