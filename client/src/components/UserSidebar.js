import { React, useState, useEffect } from 'react';

import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { Grid, Box, Button, Image, Text } from 'grommet';
import TagInput from './TagInput';
import TagDisplay from './TagDisplay';
import API from '../utils/API';
 
export default function UserSidebar(props) {

    const [ editorState, setEditorState ] = useState(EditorState.createEmpty());

    const [ followedTags, setFollowedTags ] = useState([]);
    const [ currentTag, setCurrentTag ] = useState('');

    const blockStyleFn = (contentBlock) => {
        if (contentBlock.getType() === 'code-block') {
            return 'codeBlockStyle';
        }
    }

    useEffect( async () => {

        setEditorState(
            EditorState.createWithContent(convertFromRaw(JSON.parse(props.user.bio)))
        );

        API.getTagsByUser(props.user.id).then( (response) => {
            setFollowedTags(response.data);
        }).catch( (err) => {
            console.log(err);
        });

    }, [props]);

    const followTag = (tag) => {
        API.linkTagToUser(tag, props.userState.token).then( (response) => {
            setFollowedTags([ ...(followedTags.map( e => e.name )), tag ]);
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
        <Box>

            <Image src={props.user.portrait} />

            <Box pad='small'>
                <Text size='32pt'>{props.user.userName}</Text>
                <Text>{props.user.firstName} {props.user.lastName}</Text>
                <Text>{props.user.email}</Text>
            </Box>

            <Box pad='small'>
                <Text>About {props.user.userName}</Text>
                <Editor
                    editorState={editorState}
                    readOnly={true}
                    blockStyleFn={blockStyleFn} />
            </Box>

            <Box pad='small'>
                <Text>Follows:</Text>
                { props.user.id === props.userState.id ? 
                
                    <TagInput placeholder='Follow a new tag'
                        selectedTags={followedTags.map( e => e.name )} 
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
