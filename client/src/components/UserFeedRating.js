import { React, useState, useEffect } from 'react';

import { Card, Box, Text, Anchor } from 'grommet';
import { Up, Down } from 'grommet-icons';
import API from '../utils/API';

export default function UserFeedRating(props) {

    const [targetEntity, setTargetEntity] = useState({
        User: {}
    });

    useEffect( async () => {
        let targetEntity;
        switch (props.rating.type) {
            case 'Service': 
                targetEntity = (await API.getServiceById(props.rating.ServiceId)).data
                break;
            case 'Question': 
                targetEntity = (await API.getQuestionById(props.rating.QuestionId)).data;
                break;
            case 'Answer': 
                targetEntity = (await API.getAnswerById(props.rating.AnswerId)).data;
                break;
        }
        setTargetEntity(targetEntity);
    }, []);

    const cardString = `${props.userState.id === props.targetUser.id ? 'You' : props.targetUser.firstName} left a ${props.rating.isPositive ? 'positive' : 'negative'} rating on `

    return (
        <Card height={{ min: '50px' }}>
            <Box align='center' justify='between' pad='small' fill direction='row'>
                <Box gap='small' direction='row'>
                    <Box width='40px' align='center' justify='center'>
                        {props.rating.isPositive ? <Up /> : <Down />}
                    </Box>
                    <Box>
                        <Text size='small' weight='bold'>
                            {cardString}
                            <Anchor href={`/${props.rating.type}/${targetEntity.id}`}>{`${targetEntity.User.userName}'s ${props.rating.type}`}</Anchor>
                        </Text>
                    </Box>
                </Box>
                <Text size='small'>{props.rating.createdAt}</Text>
            </Box>
        </Card>
    )
}
