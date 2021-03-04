import React from 'react';
import { Box, Text} from 'grommet';



export default function Tags(props) {
    console.log(props)
    return (
        <Box alignSelf="start" margin={{"right":"10px"}}>
            <Box
                border={{color:"#FCE181",size:"2px"}}
                align="center"
                background="#F3F3F3"
                round="5px"
                pad={{
                    "left": "15px",
                    "right": "15px",
                    "top": "3px",
                    "bottom": "3px"
                }}
                elevation="small"
                margin="5px"
            >
                <Text color="black"  >{props.children}</Text>
            </Box>
        </Box>
    )
}


