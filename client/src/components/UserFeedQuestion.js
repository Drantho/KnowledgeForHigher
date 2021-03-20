import React, { useEffect, useState } from 'react';

import { Card, Box, Text, Anchor, Grommet } from 'grommet';
import { Help } from 'grommet-icons';

export default function UserFeedQuestion(props) {

    const [ dateString, setDateString ] = useState('');

    useEffect( () => {
        const date = new Date(props.question.createdAt);
        const dateStr
            = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) + ' ' +
                date.getDate();

        if (date.getFullYear() < new Date(Date.now()).getFullYear()) {
            dateStr.concat(', ' + date.getFullYear());
        }

        setDateString(dateStr);
    }, []);

    return (
        <Card>
            <Box align='center' justify='between' pad='small' fill direction='row'>
                <Box gap='small' direction='row'>
                    <Box width='40px' align='center' justify='center'>
                        <Help />
                    </Box>
                    <Box>
                        <Text size='small' weight='bold'>
                            {props.userState.id === props.targetUser.id ? 'You' : 
                                props.targetUser.firstName} asked a question:
                        </Text>
                        <Anchor href={`/question/${props.question.id}`} >
                            {props.question.title}
                        </Anchor>
                    </Box>
                </Box>
                <Text size='small'>{dateString}</Text>
            </Box>
        </Card>
    )
}
