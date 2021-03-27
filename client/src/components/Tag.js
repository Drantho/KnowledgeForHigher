import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {Box, Card, Button, Grommet, Tip, Text} from 'grommet';
import {Add, Subtract} from 'grommet-icons';
import {Link} from 'react-router-dom';

import API from '../utils/API';

export default function Tag(props) {
    const [tagInfo, setTagInfo] = useState({});

    const handleFollowTag = (event) => {
        if (following) {
            API.unLinkTagFromUser(props.tag.name, props.userState.token).then( (response) => {
                console.log(response);
                setFollowing(false);
            }).catch( (err) => {
                console.log(err);
            });
        } else {
            API.linkTagToUser(props.tag.name, props.userState.token).then(response => {
                console.log(response);
                setFollowing(true);
            }).catch( (err) => {
                console.log(err);
            })
        }
    }

    const [following, setFollowing] = useState(false);

    useEffect(() => {
        if (props.userState.isSignedIn) {
            API.getTagsByUser(props.userState.id).then( (result) => {
                if (result.data.findIndex(e => e.id === props.tag.id) !== -1) {
                    setFollowing(true);
                }
            });
        }

        API.getTagbyName(props.tag).then( (response) => {
            setTagInfo(response.data);
        }).catch( (err) => {

        });
    }, []);

    const history = useHistory();

    const theme={
        button: {
            extend: `
                padding: 0
            `
        }
    }

    return (
        <Grommet theme={theme}>

        <Card width={props.width}  
            align='center' background='#FCE181'
            direction='row'
            round='medium'
            pad={{ horizontal: '16px', vertical: 'xxsmall' }}
            margin={{ horizontal: 'xxsmall', vertical: 'xsmall' }}>

            <Box justify='center' direction='row'>

                <Box 
                    onClick={ () => history.push(`/tag/${tagInfo.id}`) } 
                    margin={{ right: '10px' }} >
                    <Text size='12pt'>{props.tag.name ? props.tag.name : props.tag}</Text>
                </Box>

                {props.userState.isSignedIn && 
                    <Tip content={ following ? 'Unfollow' : 'Follow'}>
                        <Button onClick={handleFollowTag} 
                            icon={ following ? <Subtract size='16px' /> : <Add size='16px' />} />
                    </Tip>
                }
                
            </Box>

        </Card>
        </Grommet>
    )
}
