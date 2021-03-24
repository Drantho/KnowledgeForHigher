import React from 'react';

import { Box, Text } from 'grommet';

export default function ThreadListItem(props) {

    const caller = (event) => {
        props.onClick(props.threadId, props.toUser);
    }

    return (
        <Box
            pad='small'
            onClick={caller}
            background={props.active ? '#FCE181' : '#222E42'}
            hoverIndicator={{ color: '#FCE181'}}
            focusIndicator={true}
        >
            <Text>{props.toUser.firstName}</Text>
        </Box>
    )
}
