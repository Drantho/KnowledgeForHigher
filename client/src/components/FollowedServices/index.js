import React from 'react';
import { Box, Text, Grid} from 'grommet';


export default function FollowedServices() {

    return (
            <Box
                justify="center"
                align="center"
                pad="5px"
                background="#2B3952"
                round="5px"
                height="flex"
                // width="400px"
                margin={{
                    "left": "25px",
                    "right": "25px"
                }}
            >
                <Box height="35px" width="400px" align="center">
                    <Text size="25px">Services</Text>
                </Box>

            </Box>


    )
}

