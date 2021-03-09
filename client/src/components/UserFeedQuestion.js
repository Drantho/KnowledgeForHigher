import React from 'react';

import { Card, Box, Text, Anchor } from 'grommet';
import { Help } from 'grommet-icons';

export default function UserFeedQuestion(props) {
    return (
        <Card>
            <Box align='center' justify='between' pad='small' fill direction='row'>
                <Box gap='small' direction='row'>
                    <Box width='40px' align='center' justify='center'>
                        <Help />
                    </Box>
                    <Box>
                        <Text size='small' weight='bold'>
                            {props.userState.id === props.targetUser ? 
                                props.userState.firstName : 'You'} asked a question:
                        </Text>
                        <Anchor href={`/question/${props.question.id}`} >
                            {props.question.title}
                        </Anchor>
                    </Box>
                </Box>
                <Text size='small'>{props.question.createdAt}</Text>
            </Box>
        </Card>
    )
}
