import React from 'react';

import { Box } from 'grommet';

import Tag from './Tag';

export default function TagDisplay(props) {
    return (
        <Box 
            gap='xsmall' 
            direction='row' 
            pad={{ horizontal: 'xxsmall', vertical: 'small' }}
            wrap
        >
            { props.tags.map( e => <Tag 
                                        key={e.name || e}
                                        userState={props.userState} 
                                        filterable={props.filterable}
                                        {...props}
                                        filteredBy={props.filterable ? props.filteredBy[e.name || e] : undefined}
                                        tag={e}
                                        width={{ min: 'min-content' }} /> ) }
        </Box>
    )
}
