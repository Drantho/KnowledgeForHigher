import { React, useEffect, useState } from 'react';
import { Box, Grid, Text } from 'grommet';

import API from "../utils/API";

import Navbar from '../components/Navbar';
import TagInput from '../components/TagInput';
import TagDisplay from '../components/TagDisplay';
import EntityCard from '../components/EntityCard';
import UserWidget from '../components/UserWidget';

export default function Home(props) {

    const [ followedTags, setFollowedTags ] = useState([]);
    const [ popularTags,  setPopularTags ]  = useState([]);
    const [ filterByTags, setFilterByTags ] = useState({});
    const [ feedQuestions, setFeedQuestions ] = useState([]);
    const [ filterByPopularTags, setFilterByPopularTags ] = useState(false);
    const [ relatedUsers, setRelatedUsers ] = useState([]);

    useEffect( () => {
        if (props.userState.isSignedIn) {
            // get followed tags and set them to the default filter set
            API.getTagsByUser(props.userState.id).then( (followedResponse) => {
                setFollowedTags(followedResponse.data.map(e => e.name));
                const obj = {};
                followedResponse.data.forEach(e =>  obj[e.name] = true );
                setFilterByTags(obj);

                API.getPopularTags().then( (popularResponse) => {
                    setPopularTags(popularResponse.data.map( e => e.name ));

                    API.getRelatedUsers(followedResponse.data.map( e=> e.name), props.userState.userName)
                        .then( (relatedUsersResult) => {
                            setRelatedUsers(relatedUsersResult.data);
                        }).catch( (err) => {
                            console.log(err);
                        });
                }).catch( (err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            });
        } else {
            API.getPopularTags().then((popularResponse) => {
                setPopularTags(popularResponse.data.map(e => e.name));
            }).catch((err) => {
                console.log(err);
            })
        }

    }, []);

    useEffect( () => {
        const tags = [];
        for (const [name, filtered] of Object.entries(filterByTags)) {
            if (filtered) { 
                tags.push(name);
            }
        }
        API.getTagQuestionFeed(tags).then( (response) => {
            console.log(response);
            setFeedQuestions(response.data.map( e => ({ ...e, type: 'question' })));
        }).catch( (err) => {
            console.log(err);
        });
    }, [filterByTags]);

    const toggleTagFilter = (tagName) => {
        setFilterByTags({ ...filterByTags, [tagName]: !(filterByTags[tagName]) });
    }

    const handleClickPopularTagsHeader = (event) => {
        const obj = {};
        popularTags.forEach( e => { 
            obj[e] = filterByPopularTags;
        });
        setFilterByPopularTags(!filterByPopularTags);
        setFilterByTags(obj);
    }

    return (
        <Grid fill
            areas={[
                { name: 'nav',  start: [0, 0], end: [1, 0] },
                { name: 'left', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] },
                { name: 'right', start: [2, 1], end: [2, 1] }
            ]}
            gap='small'
            columns={[ 'auto', 'flex', 'auto' ]}
            rows={[ 'auto', 'flex' ]}
        >   
            <Box gridArea='nav'>
                <Navbar userState={props.userState} />  
            </Box>

            <Box
                pad='small'
                gap='medium'
                width='400px'
                gridArea='left'
                margin={{ top: '79px' }} 
            >
                <Box gap='small'>
                    <Box 
                        align='center' 
                        pad='small' 
                        round='small' 
                        background='#222e42'
                    >
                        <Text color='#fce181'>Followed Tags</Text>
                    </Box>
                    <TagInput 
                        lineBreak
                        filterable
                        filterToggle={toggleTagFilter}
                        filteredBy={filterByTags}
                        selectedTags={followedTags}
                        setSelectedTags={setFollowedTags}
                        userState={props.userState}
                        placeholder='Follow a new tag...' />
                </Box>

                <Box gap='small'>
                    <Box 
                        align='center' 
                        pad='small' 
                        round='small' 
                        background='#222e42'
                        onClick={handleClickPopularTagsHeader}
                    >
                        <Text color='#fce181'>Popular Tags</Text>
                    </Box>
                    <TagDisplay 
                        filterable
                        filterToggle={toggleTagFilter}
                        userState={props.userState}
                        tags={popularTags}
                        filteredBy={filterByTags} />
                </Box>
            </Box>

            <Box 
                align='center'
                gridArea='main'
                pad='small'
                gap='small'
                margin={{ top: '79px' }}
            >
                {feedQuestions.map( e => <EntityCard showUser
                                            key={e.id} 
                                            width='85%'
                                            entity={e}
                                            userState={props.userState}
                                        />) }
            </Box>

            <Box
                gridArea='right'
                width='400px'
                pad='small'
                gap='small'
                margin={{ top: '79px' }}
            >
                <Box
                    align='center'
                    pad='small'
                    round='small'
                    background='#222e42'
                >
                    <Text color='#fce181'>Related Users</Text>
                </Box>
                { relatedUsers.map( e => {
                    return  <Box justify='around' direction='row'>
                                <UserWidget userState={e} width='40%' />
                                <Box justify='center'>
                                    <Text size='12pt'>Also follows: {e.Tags.map( t => t.name )}</Text>
                                </Box>
                            </Box>
                })
                    
                }
            </Box>
        </Grid>
        
    )
}
