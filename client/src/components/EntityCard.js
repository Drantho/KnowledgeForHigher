import React from 'react';

import { Grommet, Box, Heading, Card, CardHeader, Text, CardBody, CardFooter } from 'grommet';
import { Link } from 'react-router-dom';

import Rating from './Rating';
import Tag from './Tag';

export default function EntityCard(props) {

    return (
        <Card width='85%'>
            <CardHeader align='center' elevation='small' pad={{vertical: 'xsmall'}} background='#FCE181'>
                <Text margin={{left: '20px'}} size='16px'>{props.entity.type === 'question' ? 'Question' : 'Service'}</Text> 
            </CardHeader>
            <CardBody>
                <Box pad={{bottom: '10px'}} fill align='center' direction='row'>
                    <Rating type={props.entity.type} owner={props.entity.User.id} 
                        userState={props.userState} reference={props.entity.id} />
                    <Box fill width='100%'>
                        <Link to={`/${props.entity.type}/${props.entity.id}`} >
                            <Heading fill level={3} margin={{vertical: '2px'}}>
                                {props.entity.type === 'question' ?
                                    props.entity.title : props.entity.name}
                            </Heading>
                        </Link>
                        <Box margin={{vertical: '10px', left: '10px'}} direction='row'>
                            <Box width='10px' round='2px' background='rgba(0,0,0,0.25)' />
                            <Text size='16px' margin={{vertical: 'small', left: '5px'}}>
                                {props.entity.type === 'question' ? 
                                    props.entity.text : props.entity.description}
                            </Text>
                        </Box>
                        <Box direction='row'>
                            {
                                props.entity.Tags.map((e) => {
                                    return <Tag userState={props.userState} tag={e} />
                                })
                            }
                        </Box>
                    </Box>
                </Box>  
            </CardBody>
        </Card>
    )
}
