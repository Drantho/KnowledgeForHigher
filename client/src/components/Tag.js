import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Card, Button, Grommet, Tip, Text } from 'grommet';
import { Add, Subtract } from 'grommet-icons';

import API from '../utils/API';

export default function Tag(props) {

    const [ tagInfo,   setTagInfo ]     = useState({});
    const [ following, setFollowing ]   = useState(false);
    const history = useHistory();

    const handleFollowTag = (event) => {
        if (following) {
            API.unLinkTagFromUser(props.tag.name, props.userState.token).then( (response) => {
                setFollowing(false);
            }).catch( (err) => {
                console.log(err);
            });
        } else {
            API.linkTagToUser(props.tag.name, props.userState.token).then( (response) => {
                setFollowing(true);
            }).catch( (err) => {
                console.log(err);
            });
        }
    }

    useEffect(() => {
        // Check if the current user is following this tag
        // This will control displaying a 'follow' or an 'unfollow' button
        if (props.userState.isSignedIn) {
            API.getTagsByUser(props.userState.id).then( (response) => {
                console.log(response.data);
                if (response.data.findIndex(e => e.name === props.tag || e.name === props.tag.name) !== -1) {
                    setFollowing(true);
                }
            });
        }

        // Load all tag info from data base (need ID number for linking to tag page)
        API.getTagbyName(props.tag.name || props.tag).then( (response) => {
            setTagInfo(response.data);
        }).catch( (err) => {
            console.log(err);
        });
    }, []);

    const handleTagSelect = (event) => {
        history.push(`/tag/${tagInfo.id}`);
        history.go(0);
    }

    const followTagTheme = {
        global: {
            font: {
                size: '12pt'
            },
            colors: {
                focus: undefined
            }
        },
        tip: {
            content: {
                background: 'white'
            }
        },
        button: {
            extend: `
                padding: 0
            `
        }
    }

    return (

        <Card 
            width={props.width}  
            align='center' 
            background='#FCE181'
            direction='row'
            round='medium'
            pad={{ horizontal: '16px', vertical: 'xxsmall' }}
            margin={{ horizontal: 'xxsmall', vertical: 'xsmall' }}
        >

            <Box justify='center' direction='row'>

                <Box 
                    onClick={ handleTagSelect } 
                    margin={{ right: '10px' }} 
                >
                    <Text size='12pt'>{props.tag.name || props.tag}</Text>
                </Box>

                { props.userState.isSignedIn && 
                    <Grommet theme={followTagTheme} >
                        <Tip content={ following ? 'Unfollow' : 'Follow'} >
                            <Button 
                                onClick={handleFollowTag} 
                                icon={ following ? 
                                        <Subtract size='16px' /> 
                                        : 
                                        <Add size='16px' /> }
                            />
                        </Tip>
                    </Grommet>
                }
                
            </Box>

        </Card>
    )
}
