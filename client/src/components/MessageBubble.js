import React from 'react';

import {Card, Tip, CardBody, CardFooter, Text, Box, Grommet, grommet} from 'grommet';

export default function MessageBubble(props) {

    return (
        <Grommet>
        <Box margin={{'vertical': 'small'}}
            align={props.sentOrRecieved === 'sent' ? 'end' : 'start'}>
            <Tip
                content={<Box><Text size='xsmall'>{props.date}</Text></Box>} 
                dropProps={{
                    align:  (props.sentOrRecieved === 'sent' ? {right: 'left'} : {left: 'right'}), 
                    width: 'small'
                }}>

            <Card width='medium'
                pad='medium' 
                background={props.sentOrRecieved === 'sent' ? 'dark-4' : 'dark-1'} 
                gap='medium'
                round='medium'>
                <CardBody>{props.body}</CardBody>
                <CardFooter><Text size='xsmall' color='#5B5B5B'>{props.date}</Text></CardFooter>
            </Card>
            </Tip>
        </Box>
        </Grommet>
    )
}
