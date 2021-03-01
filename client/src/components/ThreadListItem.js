import React from 'react';

import {Box, Button, Text} from 'grommet';

export default function ThreadListItem(props) {

    const caller = (event) => {
        props.onClick(props.threadId, props.toUser);
    }

    return (
        <Box
            pad='small'
            onClick={caller} 
            hoverIndicator={{ color: '#FCE181'}}>
            <Text>{props.toUser.firstName}</Text>
        </Box>
    )
}
