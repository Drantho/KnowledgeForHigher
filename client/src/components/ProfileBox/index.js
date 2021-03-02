import React from 'react';
import { Box, Button, Grid, Text, Tab, Tabs} from 'grommet';


export default function ProfileBox() {

    return (
        <Box
            justify="center"
            align="center"
            pad="5px"
            background="#222E42"
            round="5px"
            height="60px"
        >

            <Grid
                areas={[
                    ['tab', 'tab1', 'tab1'],
                ]}
                columns={['1/4', 'flex', '1/4']}
                rows={['45px']}
                gap="15px"
                responsive="true"
            >


            </Grid>
        </Box>

    )
}


