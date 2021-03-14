import React from 'react';

import { Card, Avatar, Tip, CardBody, Text, Box, Grommet } from 'grommet';

export default function MessageBubble(props) {

    return (
        <Grommet>
        <Box margin={{'vertical': '0px'}}
            align={props.sentOrRecieved === 'sent' ? 'end' : 'start'} gap='xsmall'>
            <Tip 
                content={<Box><Text size='xsmall'>{props.date}</Text></Box>} 
                dropProps={{
                    stretch: false,
                    align:  (props.sentOrRecieved === 'sent' ? {right: 'left'} : {left: 'right'}),
                    justify: 'end', 
                    width: {max: '150px'},
                }}>
            
            <Box direction='row' align='center'>
            <Card height='min-content' width={{max: 'medium'}}
                pad={{vertical: 'xsmall', horizontal:'small'}} 
                background={props.sentOrRecieved === 'sent' ? 'dark-4' : 'dark-1'} 
                gap='xsmall'
                round='medium'>
                <CardBody><Text size='small'>{props.body}</Text></CardBody>
            </Card>
            <Avatar size='medium' src={props.portrait} />
            </Box>
            </Tip>
        </Box>
        </Grommet>
    )
}
