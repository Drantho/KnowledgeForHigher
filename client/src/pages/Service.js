import { React, useState, useEffect } from 'react'
import API from '../utils/API';
import { useParams, Link } from 'react-router-dom';

import Comment from '../components/Comment';
import Rating from '../components/Rating';

import {
    Box,
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
    Grommet
} from 'grommet';

export default function Service(props) {

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
                border-radius: 3px;
                background-color: white;
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

    const { id } = useParams();

    const emptyComment = {
        text: "",
        type: "service",
        ref: id,
        user: 1
    };

    const [service, setService] = useState({
        id: "",
        Tags: [],
        User: {}
    });

    const [comment, setComment] = useState(emptyComment);

    const [comments, setComments] = useState([{
        text: "",
        type: "service",
        ref: id,
        user: "",
        User: {
            id: "",
            userName: ""
        }
    }]);

    const [ratings, setRatings] = useState({});

    const handleInputChanged = event => {
        setComment({ ...comment, text: event.target.value });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(`sending data to front api: `, comment);
        API.createServiceCommet(comment, props.userState.token).then(response => {
            console.log(response);

            API.getAllServiceComments(id).then(response => {
                setComments(response.data);
            });
            setComment(emptyComment);
        })
    }

    const HandleRating = (rating, target, type) => {
        API.createRating(
            {
                isPositive: rating,
                type: type,
                ref: target
            },
            props.userState.token
        ).then(response => {
            console.log(response);
            API.getRating(id, "question").then(response => {
                setRatings(response.data)
            })
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {

        API.getServiceById(id).then(response => {
            setService(response.data);
            console.log(response.data);
        });

        API.getAllServiceComments(id).then(response => {
            setComments(response.data);
            console.log(response.data);
        });

        API.getRating(id, "service").then(response => {
            console.log(`ratings: `, response);
            setRatings(response.data);
        });

    }, [])

    return (
        <Grommet theme={theme}>

            <Box margin={{ top: '100px', bottom: '20px' }} align='center'>
                <Box width='80%'>

                    <Box height='3px' background='#222E42' />

                    <Box justify='between' align='center' direction='row'>
                        <Rating userState={props.userState}
                            type='question' reference={id} />
                        <Heading fill level={2}>{service.name}</Heading>

                        <Box fill width={{ max: '180px', min: '180px' }}
                            background='#FCE181'
                            border={{
                                color: '#d6bf6d'
                            }}
                            round='small'
                            align='center'
                            direction='row'>
                            <Box margin={{ left: '20px' }} align='end'>
                                <Text size='small'>{service.User.userName}</Text>
                                <Text size='small'>{service.User.firstName + ' ' + service.User.lastName}</Text>
                            </Box>
                            <Link to={`/users/${service.User.id}`}>
                                <Avatar
                                    margin='small'
                                    size='40px'
                                    src={`https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/${service.User.portrait}.png`} />
                            </Link>
                        </Box>
                    </Box>


                    <Box height='3px' background='#222E42' />

                    <Grommet theme={descriptionBoxTheme}>

                        <Box pad={{ vertical: '30px', horizontal: '15px' }}
                            background='rgba(252,225,129,0.8)'
                            round='small'
                            margin={{ horizontal: 'large', top: '20px' }}>
                            <Text color='#222E42' size='large'>{service.description}</Text>
                            <p>
                                <strong>Price: </strong>${service.price}
                            </p>
                        </Box>

                    </Grommet>
                    <div>
                        <Box height='3px' background='#222E42' />

                        <p>{service.description}</p>
                        <p>
                            <strong>Price: </strong>${service.price}
                        </p>
                        <strong>Tags:</strong>
                        <ul>
                            {service.Tags.map(tag => <li key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link></li>)}
                        </ul>
                        
                        <Heading margin={{ top: 'medium', bottom: 'xsmall' }} level={3}>Comments</Heading>
                        <Box height='3px' background='#222E42' />
                        <Box align='center'>
                            {comments.map((e) => {
                                return <Comment
                                    user={e.User}
                                    reference={e.id}
                                    date={e.createdAt}
                                    text={e.text} />
                            })}

                            {(props.userState.id !== service.User.id) &&
                                <Accordion margin={{ top: '15px' }} width='85%'>
                                    <AccordionPanel label='Leave a comment...'>
                                        <Box>
                                            <Form onSubmit={handleSubmit}
                                                value={comment}>
                                                <FormField htmlFor='text-area'
                                                    onChange={handleInputChanged}
                                                    component={TextArea}
                                                    placeholder='Comment...'
                                                    value={comment} />
                                                <Button type='submit' label='Submit' />
                                            </Form>
                                        </Box>
                                    </AccordionPanel>
                                </Accordion>}
                        </Box>
                        <strong>Add Comment</strong>
                        <TextArea name="comment" value={comment.text} onChange={handleInputChanged} />
                        <Button default fill="horizontal" onClick={handleSubmit} label="Submit"/>
                    </div>
                </Box>
            </Box>
        </Grommet>
    )
}
