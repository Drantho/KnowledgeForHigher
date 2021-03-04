import React from 'react';

import { Box, Heading, Card, CardHeader, CardBody, CardFooter } from 'grommet';
import { Link } from 'react-router-dom';

import Rating from './Rating';
import Tag from './Tag';

export default function QuestionCard(props) {

    const handleSelect = (event) => {

    }

    return (
        <Card width='85%' pad='small'>
            <CardHeader>
                <Box fill align='center' onClick={handleSelect} direction='row'>
                    <Rating type='question' reference={props.question.id} />
                    <Box fill width='100%'>
                        <Link to={`/question/${props.question.id}`} >
                            <Heading fill level={3}>
                                {props.question.title}
                            </Heading>
                        </Link>
                        <Box direction='row'>
                            {
                                props.question.Tags.map((e) => {
                                    return <Tag tag={e} />
                                })
                            }
                        </Box>
                    </Box>
                </Box>  
            </CardHeader>
        </Card>
    )
}
