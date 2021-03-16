import { React, useState } from 'react';

import { Grommet, Grid, Box, Tabs, Text } from 'grommet'

export default function ProfilePage(props) {
    return (
        <Grid rows={[ 'auto', 'flex' ]}
            columns={[ 'auto', 'flex' ]}
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'nav', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] }
            ]}>
        <Box margin={{top: '300px'}} gridArea='nav'>
            <Box>

            </Box>
            <Box>
                <Text>{props.userState.name}</Text>
            </Box>
        </Box>

        </Grid>
    )
}
