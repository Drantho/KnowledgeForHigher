import React from 'react';

import { Box } from 'grommet';

import Tag from './Tag';

export default function TagDisplay(props) {
    return (
        <Box 
            style={{
                borderRadius: '5px',
                boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)',
                minHeight: 'fit-content'
            }}
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
