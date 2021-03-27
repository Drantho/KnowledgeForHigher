import React from 'react';
import { Box, Card, CardBody, Text, Avatar } from 'grommet';
import { Redirect, useHistory } from 'react-router';

export default function UserWidget(props) {

    const history = useHistory();

    return (
        <Card 
            style={{ boxShadow: '0 0 3px #9dbacc' }}
            elevation='0' 
            background='#FCE181'>
            <CardBody onClick={() => history.push(`/profile/${props.userState.id}`)}>
                <Box 
                    pad={{ horizontal: 'small' }} 
                    align='center' 
                    direction='row'
                >
                    <Text>{props.userState.userName}</Text>
                    <Avatar pad='xsmall' margin='xsmall' size='36px'
                        src={`https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/${props.userState.portrait}.png`} />
                </Box>
            </CardBody>
        </Card>
    )
}
