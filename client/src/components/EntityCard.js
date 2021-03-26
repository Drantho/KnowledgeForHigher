import React, { useEffect, useState } from 'react';

import { Box, Heading, Card, CardHeader, Text, CardBody, Tip } from 'grommet';
import { Link } from 'react-router-dom';
import { convertFromRaw, ContentState } from 'draft-js';

import Rating from './Rating';
import Tag from './Tag';
import UserWidget from './UserWidget';

export default function EntityCard(props) {

    const [descriptionDisplay, setDescriptionDisplay] = useState('');

    useEffect( () => {
        const content = convertFromRaw(JSON.parse(props.entity.text));
        const descrStr = content.getFirstBlock().getText();
        if (content.getBlocksAsArray().length > 1) {
            setDescriptionDisplay(descrStr.concat('...'));
        } else {
            setDescriptionDisplay(descrStr);
        }
    }, [props]);

    return (
        
        <Card width={props.width}>
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
                    pad={{ bottom: '10px', right: '15px' }}  
                    align='center' 
                    direction='row'
                >
                    <Rating 
                        type={props.entity.type} 
                        owner={props.entity.User.id} 
                        userState={props.userState} 
                        reference={props.entity.id} 
                    />

                    <Box width='100%'>

                        <Link to={`/${props.entity.type}/${props.entity.id}`} >
                            <Heading fill level={3} margin={{vertical: '2px'}}>
                                {props.entity.title}
                            </Heading>
                        </Link>

                        { props.entity.text && 
                                <Box margin={{vertical: '10px', left: '10px'}} direction='row'>
                                    <Box width='10px' round='2px' background='rgba(0,0,0,0.25)' />
                                    <Text 
                                        color='#919191'
                                        size='16px' 
                                        margin={{vertical: 'small', left: '5px'}}
                                    >
                                        { descriptionDisplay }
                                    </Text>
                                </Box> }

                        <Box direction='row'>
                            { props.entity.Tags.map( e => <Tag 
                                                            userState={props.userState} 
                                                            tag={e.name} />) }
                        </Box>
                    </Box>

                    { props.entity.type === 'service' && 
                        <Box margin={{ horizontal: '15px' }} wrap width={{ min: 'min-content' }}>
                        <Tip plain
                            content={
                                <Box
                                    pad='xsmall'
                                    elevation='large'
                                    round='xsmall'
                                    background='#FCE181'
                                    width={{ max: '90px' }}
                                >
                                    <Text size='12px'>
                                        Prices are estimates and may not represent the total cost for this service.
                                    </Text>
                                </Box>}>
                            <Text 
                                weight='bold' 
                                color='#222e42' 
                                size='12pt'
                            >
                                    {props.entity.price}
                            </Text>
                            </Tip>
                        </Box> }

                    { props.showUser && 
                        <UserWidget userState={props.entity.User} /> }
                </Box>  
            </CardBody>
        </Card>

    )
}
