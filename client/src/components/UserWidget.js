import React from 'react';
import { Box, Card, CardBody, Text, Avatar, Grommet } from 'grommet';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';

export default function UserWidget(props) {

    const history = useHistory();

    const handleClick = (event) => {
        history.push(`/profile/${props.userState.id}`);
        history.go(0);
    }

    const avatarExtend = {
        avatar: {
            extend: ` min-width: 36px; `
        }
    }

    return (
        <Card 
            width={{ min: 'fit-content' }}
            height='fit-content'
            margin={props.margin}
            style={{ boxShadow: '0 0 3px #9dbacc' }}
            elevation='0' 
            background='#FCE181'
        >
            <CardBody onClick={ handleClick }>
                <Box 
                    pad={{ horizontal: 'small' }} 
                    align='center' 
                    direction='row'
                    gap='xsmall'
                >
                    <Text size='12pt'>
                        {props.userState.userName}
                    </Text>

                    <Grommet theme={avatarExtend}>
                        <Avatar 
                            pad='xsmall' 
                            margin='xsmall'
                            size='36px'
                            src={`https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/` + 
                                `${props.userState.portrait}.png`} />
                    </Grommet>
                </Box>
            </CardBody>
        </Card>
    )
}
