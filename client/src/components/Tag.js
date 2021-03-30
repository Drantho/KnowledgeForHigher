import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Card, Button, Grommet, Tip, Text } from 'grommet';
import { Add, Subtract, FormView, Hide } from 'grommet-icons';

import API from '../utils/API';

export default function Tag(props) {

    const [ tagInfo,   setTagInfo ]     = useState({});
    const [ following, setFollowing ]   = useState(false);
    const history = useHistory();

    const handleFollowTag = (event) => {
        if (following) {
            API.unLinkTagFromUser(props.tag.name || props.tag, props.userState.token).then( (response) => {
                setFollowing(false);
                if (props.onUnfollow) { 
                    props.onUnfollow(); 
                }
            }).catch( (err) => {
                console.log(err);
            });
        } else {
            API.linkTagToUser(props.tag.name || props.tag, props.userState.token).then( (response) => {
                setFollowing(true);
                if (props.onFollow) {
                    props.onFollow();
                }
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

    const handleFilterToggle = (event) => {
        props.filterToggle(props.tag.name || props.tag);
    }

    const tipTheme = {
        global: {
            font: {
                size: '12pt'
            },
            colors: {
                focus: undefined
            },
            drop: {
                extend: ` min-width: min-content `
            }
        },
        tip: {
            content: {
                background: 'white'
            }
        },
        button: {
            extend: `
                padding: 5px 0 0 0;
                justify: center
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
            pad={{ left: '16px', right: '10px' }}
            margin={{ horizontal: 'xxsmall', vertical: 'xsmall' }}
        >

            <Box justify='center' align='center' direction='row'>

                <Box 
                    onClick={ handleTagSelect } 
                    margin={{ right: '7px' }} 
                    width={{ min: 'min-content' }}
                >
                    <Text size='12pt'>{props.tag.name || props.tag}</Text>
                </Box>

                { props.userState.isSignedIn && 
                    <Grommet theme={tipTheme} >
                        <Tip content={ following ? 'Unfollow' : 'Follow'} >
                            <Button 
                                margin={{ right: '3px' }}
                                onClick={handleFollowTag} 
                                icon={ following ? 
                                        <Subtract size='16px' /> 
                                        : 
                                        <Add size='16px' /> }
                            />
                        </Tip>
                    </Grommet>
                }

                { props.filterable && 
                    <Grommet theme={tipTheme}>
                        <Tip content={ props.filteredBy ? 'Filter' : 'Unfilter' }>
                            <Button
                                onClick={handleFilterToggle} 
                                icon={ props.filteredBy ? 
                                        <FormView size='22px' /> : <Hide size='22px' /> } />
                        </Tip>
                    </Grommet>  
                }
                
            </Box>

        </Card>
    )
}
