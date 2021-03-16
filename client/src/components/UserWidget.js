import React from 'react';
import { Box, Card, CardBody, Text, Avatar } from 'grommet';
import { Redirect, useHistory } from 'react-router';

export default function UserWidget(props) {

    const history = useHistory();

    const handleClick = (event) => {
        history.push(`/users/${props.userState.id}`);
    }

    return (
        <Card elevation='0' background='#FCE181'>
            <CardBody onClick={handleClick}>
                <Box pad={{ horizontal: 'small' }} align='center' direction='row'>
                    <Text>{props.userState.userName}</Text>
                    <Avatar 
                        src={props.userState.portrait}/>
                </Box>
            </CardBody>
        </Card>
    )
}
