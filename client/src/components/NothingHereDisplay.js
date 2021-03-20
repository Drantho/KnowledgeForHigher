import React from 'react'

import { Box, Text } from 'grommet';

export default function NothingHereDisplay(props) {
    return (
        <Box
            pad='xxsmall'
            align='center'
            background='rgba(0,0,0,0.1)'
            round='xxsmall'
            style={{ boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)' }}
            {...props.container}
        >
            <Text color='gray' {...props.text}>{props.message || 'Nothing here!'}</Text>
        </Box>
    )
}
