import React from 'react';
import { Box, Text, Grid } from 'grommet';



export default function MobileHomeBar() {

    return (
        <Box Box width="350px" gap="medium" style={{ position: "fixed", left:"50%", top: 20}} margin={{top:"10px", left:"-175px"}}>
        <Box
            justify="center"
            align="center"
            pad="5px"
            background="#222E42"
            round="5px"
            height="60px"
            margin={{bottom:"20px"}}
        >

            <Grid
                areas={[
                    ['test','test','test'],
                ]}
                columns={['flex', 'flex', 'flex']}
                rows={['45px']}
                gap="15px"
                responsive="true"
            >
                <Box gridArea="test" >
                    <Text>Test</Text>
                </Box>
            </Grid>
        </Box>
    </Box>

    )
}
