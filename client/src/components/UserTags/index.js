import React, { Component } from 'react';
import { Box, Text } from 'grommet';
import Tags from '../Tags'


export default function UserTags() {

    return (
            <Box
                justify="center"
                align="center"
                pad="5px"
                background="#2B3952"
                round="5px"
                height="flex"
                width="400px"
                margin={{
                    "left": "25px",
                    "right": "150px",
                    "bottom": "10px"
                }}
            >
                <Box height="35px" width="400px" align="center">
                    <Text size="25px">Followed Tags</Text>
                </Box>

            </Box>


    )
}


