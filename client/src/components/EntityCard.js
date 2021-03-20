import React, { useEffect, useState } from 'react';

import { Box, Heading, Card, CardHeader, Text, CardBody } from 'grommet';
import { Link } from 'react-router-dom';
import { convertFromRaw, ContentState } from 'draft-js';

import Rating from './Rating';
import Tag from './Tag';

export default function EntityCard(props) {

    const [descriptionDisplay, setDescriptionDisplay] = useState('');

    useEffect( () => {
        const content = convertFromRaw(JSON.parse(props.entity.text));
        const descrStr = content.getFirstBlock().getText();
        console.log(content.getBlocksAsArray().length);
        if (content.getBlocksAsArray().length > 1) {
            setDescriptionDisplay(descrStr.concat('...'));
        } else {
            setDescriptionDisplay(descrStr);
        }
    }, [])

    return (
        
        <Card>
            <CardHeader 
                align='center' 
                elevation='small' 
                pad={{vertical: 'xsmall'}} 
                background='#FCE181'
            >
                <Text 
                    margin={{left: '20px'}} 
                    size='16px'
                >
                    {props.entity.type === 'question' ? 'Question' : 'Service'}
                </Text> 
            </CardHeader>

            <CardBody>

                <Box fill
                    pad={{bottom: '10px'}}  
                    align='center' 
                    direction='row'
                >
                    <Rating 
                        type={props.entity.type} 
                        owner={props.entity.User.id} 
                        userState={props.userState} 
                        reference={props.entity.id} 
                    />

                    <Box fill width='100%'>
                        <Link to={`/${props.entity.type}/${props.entity.id}`} >
                            <Heading fill level={3} margin={{vertical: '2px'}}>
                                {props.entity.title}
                            </Heading>
                        </Link>
                        {
                            props.entity.text && 
                                <Box margin={{vertical: '10px', left: '10px'}} direction='row'>
                                    <Box width='10px' round='2px' background='rgba(0,0,0,0.25)' />
                                    <Text 
                                        size='16px' 
                                        margin={{vertical: 'small', left: '5px'}}>
                                        { descriptionDisplay }
                                    </Text>
                                </Box>
                        }
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
