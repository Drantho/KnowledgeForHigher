import React, { useState } from 'react'
import API from "../utils/API";
import { Box, Form, FormField, TextInput, Button, Heading, Grommet } from 'grommet';

import PostEditor from '../components/PostEditor';
import TagInput from '../components/TagInput';

export default function Ask(props) {

    const [formValues, setFormValues] = useState({});

    const [tagNames, setTagNames] = useState([]);

    const handleInput = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {

        API.createQuestion({
             ...formValues,
             tags: tagNames,
             user: props.userState.id
        }, props.userState.token).then( (response) => {
            console.log(response);
        }).catch( (err) => {
            console.log(err);
        });

        setFormValues({
            title: '',
            text: '',
            tags: ''
        });
        props.onSubmit();
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
        
        <Box pad={props.pad} align='center'>
            <Box fill>

                <Grommet theme={theme}>

                <Form onSubmit={handleSubmit} value={formValues}>

                    <Box margin={{ vertical: '15px' }} background='#222E42' round='small'>
                        <Heading textAlign='center' alignSelf="center" color='#FCE181' level={3}>
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
                            getDraftValue={getDraftValue} 
                            controlledContent={formValues.text}
                            placeholder='Enter a detailed description for your question...' />
                    </FormField>

                    <FormField label='Tags' name='tags' htmlFor='new-question-tags'>
                        <TagInput placeholder='Add tags...'
                            selectedTags={tagNames} setSelectedTags={setTagNames} 
                            onAddTag={onAddTag} />
                        
                    </FormField>

                    <Box align='center'>
                        <Button size='medium' primary type='submit' label='Submit' />
                    </Box>
                    
                </Form>

                </Grommet>
            </Box>
        </Box>
        
    )
}
