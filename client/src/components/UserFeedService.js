import React, { useEffect, useState } from 'react';

import { Card, Box, Text, Anchor } from 'grommet';
import { Currency } from 'grommet-icons';

export default function UserFeedService(props) {

    const [ dateString, setDateString ] = useState('');

    useEffect(() => {
        console.log(props);
        const date = new Date(props.service.createdAt);
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
                        <Currency />
                    </Box>
                    <Box>
                        <Text size='small' weight='bold'>
                            {props.userState.id === props.targetUser.id ? 'You' :
                                props.targetUser.firstName} posted a service:
                        </Text>
                        <Anchor href={`/service/${props.service.id}`} >
                            {props.service.title}
                        </Anchor>
                    </Box>
                </Box>
                <Text size='small'>{dateString}</Text>
            </Box>
        </Card>
    )
}