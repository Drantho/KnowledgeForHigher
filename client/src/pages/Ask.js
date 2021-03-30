import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Box, Form, FormField, TextInput, Button, Heading, Grommet, Anchor, Text } from 'grommet';
import { EditorState, convertFromRaw } from 'draft-js';

import API from '../utils/API';
import PostEditor from '../components/PostEditor';
import TagInput from '../components/TagInput';
import Navbar from '../components/Navbar';

export default function Ask(props) {

    const history = useHistory();
    const [ formValues, setFormValues ] = useState({});
    const [ tagNames,   setTagNames ]   = useState([]);
    const [ errorState, setErrorState ] = useState({});

    const handleInput = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {

        // Check if description is empty
        if ( !(EditorState
                .createWithContent(
                    convertFromRaw(
                        JSON.parse(formValues.text)))).getCurrentContent().hasText() ) {
            setErrorState({ ...errorState, description: true });
            return;
        }

        API.createQuestion({
             ...formValues,
             tags: tagNames,
             user: props.userState.id
        }, props.userState.token).then( (response) => {
            setFormValues({
                title: '',
                text: '',
                tags: ''
            });
    
            if (props.onSubmit) {
                props.onSubmit();
            }
            
            history.push(`/question/${response.data.id}`);
        }).catch( (err) => {
            console.log(err);
        });
    }

    const theme = {
        global: {
            colors: {
                focus: {
                    border: undefined
                }
            }
        },
        button: {
            border: {color: '#FCE181'},
            primary: {
                color: '#FCE181',
                border: { color: '#FCE181' }
            },
            size: {
                medium: {
                    border: {
                        radius: '8px'
                    }
                }
            },
            extend: `
                width: 150px;
                height: 60px
            `
        },
        formField: {
            border: false
        }
    }

    const getDraftValue = (draftRawObj) => {
        setFormValues({ ...formValues, text: JSON.stringify(draftRawObj) });
    }

    const onAddTag = (tag) => {
        if (tagNames.indexOf(tag) < 0) {
            setTagNames([...tagNames, tag]);
        }
    }

    return ( 
        <>
        { props.showNav &&
            <Navbar userState={props.userState} /> }

        <Box pad={props.pad} align='center'>
            <Box margin={ props.showNav ? { top: '94px' } : undefined } fill>

                <Grommet theme={theme}>
                    { props.showBackButton && history.length > 0 &&
                        <Anchor onClick={() => history.goBack()}>
                            &lt; Back
                        </Anchor> }

                    <Form onSubmit={handleSubmit} value={formValues}>

                        <Box 
                            margin={{ vertical: '15px' }} 
                            background='#222E42' 
                            round='small'
                        >
                            <Heading 
                                textAlign='center' 
                                alignSelf='center'
                                color='#FCE181' 
                                level={3}
                            >
                                Submit a question!
                            </Heading>
                        </Box>

                        <FormField 
                            required 
                            label='Title' 
                            name='title' 
                            htmlFor='new-question-title' 
                        >
                            <TextInput
                                style={{background:'white'}}
                                id='new-question-title'
                                name='title'
                                placeholder='Enter a descriptive question title.' 
                                value={formValues.title}
                                onChange={handleInput} />
                        </FormField>

                        <FormField label='Description'>
                            <PostEditor 
                                onChange={() => setErrorState({ ...errorState, description: false })}
                                getDraftValue={getDraftValue} 
                                controlledContent={formValues.text}
                                placeholder='Enter a detailed description for your question...' />
                        </FormField>
                        { errorState.description &&
                            <Text color='red'>Description is required</Text> }

                        <FormField label='Tags' name='tags' htmlFor='new-question-tags'>
                            <TagInput 
                                userState={props.userState}
                                placeholder='Add tags...'
                                selectedTags={tagNames} 
                                setSelectedTags={setTagNames} 
                                onAddTag={onAddTag} />
                        </FormField>

                        <Box align='center'>
                            <Button 
                                size='medium' 
                                primary 
                                type='submit' 
                                label='Submit' />
                        </Box>
                        
                    </Form>

                </Grommet>
            </Box>
        </Box>
        </>
    )
}
