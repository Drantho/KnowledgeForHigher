import React, { useEffect, useState } from 'react';

import { Box, Text } from 'grommet';
import API from '../utils/API';

export default function ProfileCreateBanner(props) {
    const [ dateStr, setDateStr ] = useState('');

    useEffect( () => {
        API.getUserById(props.user.id).then( (response) => {
            const date = new Date(response.data.createdAt);
            const dateString
                = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) + ' ' +
                    date.getDate() + ', ' + date.getFullYear();
            setDateStr(dateString);
        }).catch( (err) => {
            console.log(err);
        })
    }, []);

    return (
        <Box pad='small' gap='small' align='center' {...props.container}>
            <Box background='gray' height='2px' width='100%'  />
            <Text size='12pt' color='gray'>
                {props.user.userName} joined on {dateStr}
            </Text>
        </Box>
    )
}
