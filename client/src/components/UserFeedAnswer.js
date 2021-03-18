import { React, useState, useEffect } from 'react';

import { Card, Box, Text, Anchor } from 'grommet';
import { Edit } from 'grommet-icons';
import API from '../utils/API';

export default function UserFeedAnswer(props) {

    const [targetUser, setTargetUser] = useState({});

    useEffect( async () => {
        const re = await API.getUserById(props.answer.UserId);
        setTargetUser(re.data);
    }, [])

    return (
        <Card>
            <Box align='center' justify='between' pad='small' fill direction='row'>
                <Box gap='small' direction='row'>
                    <Box width='40px' align='center' justify='center'>
                        <Edit />
                    </Box>
                    <Box>
                        <Text size='small' weight='bold'>
                            {props.userState.id === props.targetUser.id ?
                                'You' : props.targetUser.firstName} submitted an answer to 
                            <Anchor href={`/question/${targetUser.id}`}> {targetUser.userName}'s question.</Anchor>
                        </Text>
                    </Box>
                </Box>
                <Text size='small'>{props.answer.createdAt}</Text>
            </Box>
        </Card>
    )
}
