import { React, useState, useEffect } from 'react'

import { Form, FormField, TextInput, Button, Box, Text } from 'grommet';

import { Editor, EditorState, ContentState } from 'draft-js';
import API from '../utils/API';

import PostEditor from './PostEditor';

export default function UserEditForm(props) {

    const [ formValues, setFormValues ] = useState({
        firstName: '',
        lastName: '',
        bio: ''
    });

    const [ firstNameEditorState, setFirstNameEditorState] = useState(EditorState.createEmpty());
    const [ firstNameReadOnly, setFirstNameReadOnly ] = useState({ val: true })
    const [ lastNameEditorState, setLastNameEditorState] = useState(EditorState.createEmpty());
    const [ lastNameReadOnly, setLastNameReadOnly ] = useState({ val: true })
 
    const getDraftValue = (draftRawObj) => {
        setFormValues({ ...formValues, bio: JSON.stringify(draftRawObj) });
    }

    useEffect( () => {
        setFirstNameEditorState(
            EditorState.createWithContent(ContentState.createFromText(props.userState.firstName))
        );

        setLastNameEditorState(
            EditorState.createWithContent(ContentState.createFromText(props.userState.lastName))
        );

    }, []);

    const handleEsc = (event) => {
        console.log(event);
        setFirstNameEditorState(
            EditorState.createWithContent(
                ContentState.createFromText(props.userState.firstName)
            )
        )
        setFirstNameReadOnly({ val: true })
    }

    const handleSave = (event) => {
        event.preventDefault();
        const newFirstName = firstNameEditorState.getCurrentContent().getPlainText();
        const newLastName = lastNameEditorState.getCurrentContent().getPlainText();
        console.log({
            firstName: newFirstName,
            lastName: newLastName,
            bio: formValues.bio
        })

        API.updateUser({
            firstName: newFirstName,
            lastName: newLastName,
            bio: formValues.bio
        }, props.userState.token).then( (response) => {
            props.setUserState({
                ...props.userState,
                firstName: newFirstName,
                lastName: newLastName,
                bio: formValues.bio
            })
        }).catch( (err) => {
            console.log(err);
        });
    }

    return (
        <Box gap='small'>
            <Box align='center' justify='end' direction='row' className='inline-editor'>
                <Text margin={{right: '10px'}}>First Name: </Text>
                <Box background='white' onDoubleClick={() => setFirstNameReadOnly({ val: false })}>
                    <Editor onEscape={handleEsc}
                        onChange={ state => setFirstNameEditorState(state) }
                        readOnly={firstNameReadOnly.val} 
                        editorState={firstNameEditorState} />
                </Box>
            </Box>
            <Box align='center' justify='end' direction='row' className='inline-editor'>
                <Text margin={{right: '10px'}}>Last Name: </Text>
                <Box onDoubleClick={() => setLastNameReadOnly({ val: false })}>
                    <Editor 
                        onChange={ state => setLastNameEditorState(state) }
                        readOnly={lastNameReadOnly.val} 
                        editorState={lastNameEditorState} />
                </Box>
            </Box>
            <Text>Bio:</Text>
            <PostEditor getDraftValue={getDraftValue} 
                controlledContent={formValues.bio}
                initialContent={props.userState.bio} />

            <Button label='Save' onClick={handleSave} />
        </Box>


    )
}
