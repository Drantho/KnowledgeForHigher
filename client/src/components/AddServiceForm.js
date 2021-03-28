import { React, useState } from 'react';

import { Grommet, Box, Form, FormField, TextInput, Button, Heading, Text } from 'grommet';
import { EditorState, convertFromRaw } from 'draft-js';

import PostEditor from './PostEditor';
import TagInput from './TagInput';
import API from '../utils/API';

export default function AddServiceForm(props) {

    const [formValues, setFormValues] = useState({});
    const [tagNames, setTagNames] = useState([]);
    const [errorState, setErrorState] = useState({});

    const handleInput = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        // Check if description is empty
        if (!(EditorState
            .createWithContent(
                convertFromRaw(
                    JSON.parse(formValues.text)))).getCurrentContent().hasText()) {
            setErrorState({ ...errorState, description: true });
            return;
        }

        API.createService({
            ...formValues,
            tags: tagNames,
            user: props.userState.id
        }, props.userState.token).then( (response) => {
            if ( props.onSubmit) { 
                props.onSubmit();
            }
        }).catch( (err) => {
            console.log(err);
        });
    }

    const onAddTag = (tag) => {
        if (tagNames.indexOf(tag) < 0) {
            setTagNames([...tagNames, tag]);
        }
    }

    const theme = {
        formField: {
            border: false
        }, 
        global: {
            colors: {
                focus: {
                    border: undefined
                }
            }
        },
        button: {
            border: { color: '#FCE181' },
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
        }
    }

    return (
        <Grommet theme={theme}>
        <Box pad="5px">

            <Box 
                margin={{ vertical: '15px' }} 
                background='#222E42' 
                round='small'
            >
                <Heading textAlign='center' alignSelf="center" color='#FCE181' level={3}>
                    Add a service
                </Heading>
            </Box>

            <Form onSubmit={handleSubmit}>
                <FormField label='Service Name' 
                    name='title'
                    htmlFor='title'>
                    <TextInput placeholder='Enter a name for your service...'
                        name='title' 
                        value={formValues.title} 
                        onChange={handleInput} 
                    />
                </FormField>
                
                <FormField label='Description'>
                    <PostEditor 
                        onChange={() => setErrorState({ ...errorState, description: false })}
                        getDraftValue={ 
                            val => { setFormValues({ ...formValues, text: JSON.stringify(val) }) }
                        } 
                        controlledInput={formValues.text}
                        placeholder='Enter a detailed description of your service...' />
                </FormField>
                { errorState.description &&
                    <Text color='red'>Description is required</Text> }

                <FormField label='Cost' name='price' htmlFor='price'>
                    <TextInput placeholder='Examples: $5/hour; $100 (one time)'
                        name='price' 
                        value={formValues.price}
                        onChange={handleInput} />
                </FormField>

                <FormField label='Tags' name='tags' htmlFor='new-question-tags'>
                    <TagInput placeholder='Add tags...'
                        selectedTags={tagNames} setSelectedTags={setTagNames}
                        onAddTag={onAddTag} />
                </FormField>
                
                <Box align='center'>
                    <Button primary type='submit' label='Submit' />
                </Box>
            </Form>

        </Box>
        </Grommet>
    )
}
