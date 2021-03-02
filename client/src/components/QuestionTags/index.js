import React from 'react';
import { Box, Text} from 'grommet';
import { Link } from 'react-router-dom'


export default function QuestionTags(props) {
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
                <Link to={`/tag/${props.props.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <Text color="blue">{props.props.name}</Text>
                </Link>
            </Box>
        </Box>
    )
}


