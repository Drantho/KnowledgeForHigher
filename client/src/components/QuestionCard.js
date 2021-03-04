import React from 'react';

import { Box, Heading, Card, CardHeader, Text, CardBody, CardFooter } from 'grommet';
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
                            <Heading fill level={3} margin={{bottom: '0'}}>
                                {props.question.title}
                            </Heading>
                        </Link>
                        <Box margin={{vertical: '10px', left: '10px'}} direction='row'>
                            <Box width='10px' round='2px' background='rgba(0,0,0,0.25)' />
                            <Text size='16px' margin={{vertical: 'small', left: '5px'}}>
                                {props.question.text}
                            </Text>
                        </Box>
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
