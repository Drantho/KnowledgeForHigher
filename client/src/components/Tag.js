import React from 'react'

import {Box, Card} from 'grommet';
import {Link} from 'react-router-dom';

export default function Tag(props) {
    return (
        <Card background='#FCE181' height='30px' width='xsmall'>
            <Link to={`/tag/${props.tag.id}`}>
            <Box justify='center' align='center' >
                {props.tag.name}
            </Box>
            </Link>
        </Card>
    )
}
