import { React, useState, useEffect } from 'react';

import { Card, Box, Text, Anchor, Grommet } from 'grommet';
import { Up, Down } from 'grommet-icons';
import API from '../utils/API';

export default function UserFeedRating(props) {

    const [ dateString, setDateString ] = useState('');
    const [ cardString, setCardString ] = useState('');
    const [ href, setHref ] = useState('');
    const [ targetEntity, setTargetEntity ] = useState({
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

        const date = new Date(props.rating.createdAt);
        const dateStr
            = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) + ' ' +
                date.getDate();

        if (date.getFullYear() < new Date(Date.now()).getFullYear()) {
            setDateString(dateStr.concat(', ' + date.getFullYear()));
        } else {
            setDateString(dateStr);
        }

        let typeStr, urlId;
        if (props.rating.type === 'Answer') {
            typeStr = 'Question';
            urlId = targetEntity.Question.id
        } else {
            typeStr = props.rating.type;
            urlId = targetEntity.id;
        }
        setCardString(`${(props.userState.id === props.targetUser.id ? 'You' : props.targetUser.firstName)}`
            + ` left a ${props.rating.isPositive ? 'positive' : 'negative'} rating on `);
        setHref(`/${typeStr}/${urlId}`);

        setTargetEntity(targetEntity);
    }, []);

    return (
        <Card fill>
            <Box align='center' justify='between' pad='small' fill direction='row'>
                <Box gap='small' direction='row'>
                    <Box width='40px' align='center' justify='center'>
                        {props.rating.isPositive ? <Up /> : <Down />}
                    </Box>
                    <Box>
                        <Text size='small' weight='bold'>
                            {cardString}
                            <Anchor href={href}>
                                {`${targetEntity.User.userName}'s ${props.rating.type}`}
                            </Anchor>
                        </Text>
                    </Box>
                </Box>
                <Text size='small'>{dateString}</Text>
            </Box>
        </Card>
    )
}
