import { React, useEffect, useState } from 'react';
import { Box, Grid, Text, Grommet, CheckBox, grommet } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';

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
    const [ feedEntities, setFeedEntities ] = useState([]);
    const [ filterByPopularTags, setFilterByPopularTags ] = useState(false);
    const [ relatedUsers, setRelatedUsers ] = useState([]);
    const [ showQuestions, setShowQuestions ] = useState(true);
    const [ showServices, setShowServices ] = useState(true);

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
                const obj = {};
                popularResponse.data.forEach(e => obj[e.name] = true);
                setFilterByTags(obj);
                API.getRelatedUsers(popularResponse.data.map(e => e.name), '')
                    .then( (relatedUsersResult) => {
                        setRelatedUsers(relatedUsersResult.data);
                    }).catch( (err) => {
                        console.log(err);
                    })
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
            API.getTagServiceFeed(tags).then( (serviceResponse) => {
                setFeedEntities([
                    ...(response.data.map( e => ({ ...e, type: 'question' }))),
                    ...(serviceResponse.data.map(e => ({ ...e, type: 'service' })))
                ]);
            }).catch( (err) => {
                console.log(err);
            });
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

    const checkBoxTheme = {
        global: {
            colors: {
                focus: {
                    border: undefined
                }
            }
        },
        checkBox: {
            color: '#222e42',
            hover: {
                border: {
                    color: undefined,
                    radius: '50%'
                }
            },
            border: {
                radius: '50%'
            },
            size: '22px',
            icon: {
                extend: `padding: 2px; fill: #222e42;`
            },
            icons: {
                checked: StatusGoodSmall
            }
        }
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
                { props.userState.isSignedIn && 
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
                    </Box> }

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
                    <Box
                        style={{
                            borderRadius: '5px',
                            boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)',
                            minHeight: 'fit-content'
                        }}
                    >
                        <TagDisplay 
                            filterable
                            filterToggle={toggleTagFilter}
                            userState={props.userState}
                            tags={popularTags}
                            filteredBy={filterByTags} />
                    </Box>
                </Box>
            </Box>

            <Box 
                align='center'
                gridArea='main'
                pad='small'
                gap='small'
                margin={{ top: '79px' }}
            >
                <Grommet theme={checkBoxTheme}>
                <Box gap='small' direction='row'>
                    <Text margin={{ right: '10px'}}>Show:</Text>
                    <CheckBox 
                        checked={showQuestions} 
                        label='Questions' 
                        onChange={() => setShowQuestions(!showQuestions)} 
                        />
                    <CheckBox 
                        checked={showServices} 
                        label='Services'
                        onChange={() => setShowServices(!showServices)} 
                        />
                </Box>
                </Grommet>

                { feedEntities.map( e => {
                    if (e.type === 'service' && !showServices) {
                        return;
                    }
                    if (e.type === 'question' && !showQuestions) {
                        return;
                    }
                    return <EntityCard showUser
                                            key={e.id} 
                                            width='85%'
                                            entity={e}
                                            userState={props.userState}
                                        />
                    }) }
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
                <Box
                    pad='small'
                    gap='small'
                    style={{
                        borderRadius: '5px',
                        boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)',
                        minHeight: 'fit-content'
                    }}
                    >
                    { relatedUsers.map( e => {
                        return  <Box justify='around' direction='row'>
                                    <UserWidget userState={e} width='40%' />
                                    <Box justify='center'>
                                        <Text size='12pt'>
                                            Also follows: {e.Tags.map( t => t.name )}
                                        </Text>
                                    </Box>
                                </Box>
                    }) }
                </Box>
            </Box>
        </Grid>
        
    )
}
