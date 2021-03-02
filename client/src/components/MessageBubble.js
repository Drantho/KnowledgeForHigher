import React from 'react';

import {Card, Tip, CardBody, CardFooter, Text, Box, Grommet, grommet} from 'grommet';

export default function MessageBubble(props) {

    return (
        <Grommet>
        <Box margin={{'vertical': 'xsmall'}}
            align={props.sentOrRecieved === 'sent' ? 'end' : 'start'} gap='xsmall'>
            <Tip 
                content={<Box><Text size='xsmall'>{props.date}</Text></Box>} 
                dropProps={{
                    stretch: false,
                    align:  (props.sentOrRecieved === 'sent' ? {right: 'left'} : {left: 'right'}),
                    justify: 'end', 
                    width: {max: '150px'},
                }}>

            <Card width='medium'
                pad={{vertical: 'xsmall', horizontal:'medium'}} 
                background={props.sentOrRecieved === 'sent' ? 'dark-4' : 'dark-1'} 
                gap='xsmall'
                round='medium'>
                <CardBody><Text size='small'>{props.body}</Text></CardBody>
            </Card>
            </Tip>
        </Box>
        </Grommet>
    )
}
