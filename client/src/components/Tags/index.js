import React, { Component } from 'react';
import { Box, Text, Grid } from 'grommet';
import { Add } from 'grommet-icons';


export default function Tags(props) {
    console.log(props)
    return (
        <Box alignSelf="start" margin={{"right":"10px"}}>
            <Box
                direction="row"
                align="center"
                background="#F3F3F3"
                round="5px"
                pad={{
                    "left": "15px",
                    "right": "15px",
                    "top": "3px",
                    "bottom": "3px"
                }}
                gridArea="tag"
                elevation="small" 
            >
                <Text color="blue">{props.children}</Text>
                {/* <Add size="15px"/> */}
            </Box>
        </Box>
    )
}


