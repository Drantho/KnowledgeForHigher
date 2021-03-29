import React from 'react';

import { Card, Avatar, Tip, CardBody, Text, Box, Grommet } from 'grommet';

export default function MessageBubble(props) {

    return (
        <Grommet>
        <Box
            align={props.sentOrRecieved === 'sent' ? 'end' : 'start'} 
            gap='xsmall'
        >
            <Tip 
                content={<Box><Text size='xsmall'>{props.date}</Text></Box>} 
                dropProps={{
                    stretch: false,
                    align: (props.sentOrRecieved === 'sent' ? {right: 'left'} : {left: 'right'}),
                    justify: 'end', 
                    width: {max: '150px'},
                }}
            >
                <Box 
                    direction='row'  
                    gap='small' 
                    align='center'
                    margin={ (props.sentOrRecieved !== 'sent' && props.showPortrait) ? 
                        { top: '-10px' } : undefined }
                >
                    { props.sentOrRecieved !== 'sent' && props.showPortrait && 
                        <Avatar 
                            elevation='small'
                            size='medium' 
                            src={`https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/` +
                                `${props.portrait}.png` } 
                        /> }
                    
                        {props.sentOrRecieved !== 'sent' && !props.showPortrait && <Box width='48px' />}

                    <Card 
                        height='min-content' 
                        width={{ max: 'medium' }}
                        pad={{ vertical: '4px', horizontal: '16px' }} 
                        background={props.sentOrRecieved === 'sent' ? 'dark-4' : 'dark-1'} 
                        gap='xsmall'
                        round='medium'
                    >
                        <CardBody>
                            <Text size='12pt'>{props.body}</Text>
                        </CardBody>
                    </Card>
                </Box>
            </Tip>
        </Box>
        </Grommet>
    )
}
