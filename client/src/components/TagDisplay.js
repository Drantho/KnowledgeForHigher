import React from 'react';

import { Box } from 'grommet';

import Tag from './Tag';

export default function TagDisplay(props) {
    return (
        <Box gap='xsmall' direction='row' wrap>
            { props.tags.map( e => <Tag userState={props.userState} 
                                        tag={e}
                                        width={{ min: 'min-content' }} /> ) }
        </Box>
    )
}
