import {React, useState, useEffect} from 'react'

import {Box, Card, Button, Grommet, Tip} from 'grommet';
import {Add, Subtract} from 'grommet-icons';
import {Link} from 'react-router-dom';

import API from '../utils/API';

export default function Tag(props) {
    const handleFollowTag = (event)=> {
        console.log(`handlefollowtag(${props.tag.id}) clicked`);
        API.linkTagToUser({ tags: [props.tag.name] }, props.userState.token).then(response => {
            console.log(response);
        });
        setFollowing(true);
    }

    const [following, setFollowing] = useState(false);

    useEffect(() => {
        API.getTagsByUser(props.userState.id).then( (result) => {
            if (result.data.findIndex(e => e.id === props.tag.id) !== -1) {
                setFollowing(true);
            }
        });
    }, []);

    const theme={
        button: {
            extend: `
                padding: 0
            `
        }
    }

    return (
        <Grommet theme={theme}>

        <Card justify='center' background='#FCE181' height='30px' width='xsmall'>
            <Box justify='center' direction='row'>
                <Link to={`/tag/${props.tag.id}`}>
                    <Box margin={{right: '10px'}}>
                        {props.tag.name}
                    </Box>
                </Link>
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
