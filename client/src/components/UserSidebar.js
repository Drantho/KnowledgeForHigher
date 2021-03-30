import { React, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { Box, Button, Image, Stack, Text } from 'grommet';
import TagInput from './TagInput';
import TagDisplay from './TagDisplay';
import API from '../utils/API';
import messageAPI from '../utils/messageAPI';
import NothingHereDisplay from './NothingHereDisplay';
import { Add } from 'grommet-icons';
 
export default function UserSidebar(props) {

    const history = useHistory()

    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

    const [ followedTags, setFollowedTags ] = useState([]);

    const [portraitSrc, setPortraitSrc] = useState("");
    const [portraitData, setPortraitData] = useState(null);

    const blockStyleFn = (contentBlock) => {
        if (contentBlock.getType() === 'code-block') {
            return 'codeBlockStyle';
        }
    }

    useEffect( () => {
        if (props.user.bio !== '' && props.user.bio !== null) {
            setEditorState(
                EditorState.createWithContent(convertFromRaw(JSON.parse(props.user.bio)))
            );
        }

        API.getTagsByUser(props.user.id).then( (response) => {
            setFollowedTags(response.data.map(e => e.name));
            console.log(response.data);
        }).catch( (err) => {
            console.log(err);
        });

    }, [props]);

    useEffect( async () => {
        if (portraitData) {
            const photoResult
                = await API.uploadPhoto(portraitData, props.userState.token)
                    .catch(err => console.log(err));

            localStorage.setItem("portrait", photoResult.data.id)
            props.setUserState({ ...props.userState, portrait: photoResult.data.id })
            setPortraitSrc("");
            setPortraitData(null);
        }
    }, [portraitData, props]);

    const followTag = (tag) => {
        API.linkTagToUser(tag, props.userState.token).then( (response) => {
            setFollowedTags([ ...followedTags, tag ]);
            console.log(response);
        }).catch( (err) => {
            console.log(err);
        });
    }

    const unfollowTag = (tag) => {
        API.unLinkTagFromUser(tag, props.userState.token).then( (response) => {
            console.log(response);
        }).catch( (err) => {
            console.log(err);
        });
    }

    const handleChangeProfilePic = async (event) => {
        event.preventDefault();
        if (!event.target.files) {
            return;
        }
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPortraitSrc(reader.result);
            setPortraitData(reader.result);
        }
    }

    const handleMessage = async (event) => {
        event.preventDefault();
        const newThread 
            = await messageAPI.createThread(props.user.userName, props.userState.token);
        history.push(`/messages/${newThread.data.thread.id}`)
    }

    return (
        <Box 
            overflow={{ vertical: 'scroll' }}
            elevation='xsmall' 
            height='100%'
            border={{ side: 'right', size: '2px', color: '#FCE181' }}
        >
            
            <Stack anchor='bottom-right'>
                <Image
                    style={{ 
                        minWidth: '255px',
                        border: 'solid 1px rgba(0,0,0,0.2)', 
                        borderRadius: '50%', 
                        margin: '10px',
                    }}
                    src={`https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/` + 
                         `${props.user.portrait}.png`} 
                />
                { props.userState.id === props.user.id && 
                    <Box 
                        onClick={() => document.getElementById('uploadPic').click()} 
                        pad='xsmall' 
                        background='#222e42'
                        border={{ color: '#9dbacc', size: '3px' }}
                        round='50%'
                        elevation='large'
                        margin={{ right: 'large', bottom: '10px' }}
                    >
                        <input 
                            type='file' 
                            id='uploadPic' 
                            onChange={handleChangeProfilePic} 
                            style={{ display: 'none' }} />
                        <Add size='32px' color='#fce181' />
                    </Box> }
            </Stack>

            <Box style={{ minHeight: 'fit-content' }} pad='small'>
                <Text size='32pt'>{props.user.userName}</Text>
                <Text>{props.user.firstName} {props.user.lastName}</Text>
                <Text>{props.user.email}</Text>
            </Box>
            
            { props.userState.isSignedIn && props.userState.id !== props.user.id &&
                <Box alignSelf='center' width='90%'>
                    <Button 
                        onClick={handleMessage} 
                        label={`Message ${props.user.userName}`} />
                </Box> }
            

            <Box style={{ minHeight: 'fit-content' }} pad='small'>
                <Text margin={{ bottom: '1px' }}>About {props.user.userName}</Text>
                <Box 
                    background='#222E42' 
                    margin={{ bottom: '5px' }} 
                    height='1px' 
                    elevation='small' />

                { props.user.bio ?
                    <Editor
                        editorState={editorState}
                        readOnly={true}
                        blockStyleFn={blockStyleFn} />
                    :
                    <NothingHereDisplay /> }  
            </Box>

            <Box pad='small'>
                <Text>Follows:</Text>
                <Box
                    background='#222E42'
                    margin={{ bottom: '5px' }}
                    height='1px'
                    elevation='small' />

                { props.user.id === props.userState.id ?      
                    <TagInput placeholder='Follow a new tag'
                        selectedTags={followedTags} 
                        setSelectedTags={setFollowedTags}
                        userState={props.userState}
                        lineBreak={true}
                        onAddTag={followTag}
                        onRemoveTag={unfollowTag} />
                    :
                    ( followedTags.length > 0 ? 
                        <TagDisplay userState={props.userState} tags={followedTags} />
                        :
                        <NothingHereDisplay /> )}
            </Box>
        </Box>
    )
}
