import React from 'react';
import { Box, Text } from 'grommet';



export default function UserTags() {

    return (
            <Box
                justify="center"
                align="center"
                pad="5px"
                background="#3A4B6A"
                round="5px"
                height="flex"

                margin={{
                    "left": "25px",
                    "right": "25px"
                }}
            >
                <Box height="35px" width="400px" align="center">
                    <Text size="25px" color="white" weight="bold" style={{letterSpacing:"2px"}}>Popular Tags</Text>
                </Box>

            </Box>


    )
}
