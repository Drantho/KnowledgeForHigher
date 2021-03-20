import { React, useState, useEffect } from 'react';

import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { Box, Image, Text } from 'grommet';
import TagInput from './TagInput';
import TagDisplay from './TagDisplay';
import API from '../utils/API';
import NothingHereDisplay from './NothingHereDisplay';
 
export default function UserSidebar(props) {

    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

    const [ followedTags, setFollowedTags ] = useState([]);

    const blockStyleFn = (contentBlock) => {
        if (contentBlock.getType() === 'code-block') {
            return 'codeBlockStyle';
        }
    }

    useEffect( async () => {
        if (props.user.bio !== '' && props.user.bio !== null) {
            setEditorState(
                EditorState.createWithContent(convertFromRaw(JSON.parse(props.user.bio)))
            );
        }

        API.getTagsByUser(props.user.id).then( (response) => {
            setFollowedTags(response.data.map(e => e.name));
        }).catch( (err) => {
            console.log(err);
        });

    }, [props]);

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

    return (
        <Box 
            overflow={{ vertical: 'scroll' }}
            elevation='xsmall' 
            height='100%' 
            border={{ side: 'right', size: '2px', color: '#FCE181' }}>

            <Image
                style={{ 
                    border: 'solid 1px rgba(0,0,0,0.2)', 
                    borderRadius: '50%', 
                    margin: '10px',
                    boxShadow: '0 0 5px rgba(0,0,0,0.4)'
                }}
                src={`https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/${props.user.portrait}.png`} />
            

            <Box pad='small'>
                <Text size='32pt'>{props.user.userName}</Text>
                <Text>{props.user.firstName} {props.user.lastName}</Text>
                <Text>{props.user.email}</Text>
            </Box>
            

            <Box pad='small'>
                <Text margin={{ bottom: '1px' }}>About {props.user.userName}</Text>
                <Box background='#222E42' margin={{ bottom: '5px' }} height='1px' elevation='small' />

                { props.user.bio ?
                    <Editor
                        editorState={editorState}
                        readOnly={true}
                        blockStyleFn={blockStyleFn} />
                    :
                    <NothingHereDisplay />
                }
                
            </Box>

            <Box pad='small'>
                <Text>Follows:</Text>
                <Box background='#222E42' margin={{ bottom: '5px' }} height='1px' elevation='small' />
                { props.user.id === props.userState.id ? 
                
                    <TagInput placeholder='Follow a new tag'
                        selectedTags={followedTags} 
                        setSelectedTags={setFollowedTags}
                        lineBreak={true}
                        onAddTag={followTag}
                        onRemoveTag={unfollowTag} />
                    
                    :

                    <TagDisplay userState={props.userState} tags={followedTags} />
            
                }
            </Box>

        </Box>
    )
}
