import React, { useState } from 'react'
import API from "../utils/API";
import { useHistory } from 'react-router-dom';
import { Box, Form, FormField, TextArea, Button, Heading, Grommet } from 'grommet';


export default function Ask(props) {

    const [formValues, setFormValues] = useState({});

    const handleInput = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        // Convert tags string to array
        let tags;
        if (formValues.tags) {
            tags = formValues.tags.split(',').map(e => e.trim());
        }

        API.createQuestion({
             ...formValues,
             tags: tags,
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

    const descrTheme = {
        global: {
            colors: {
                focus: {
                    border: undefined
                }
            }
        },
        textArea: {
            extend: `
                height: 200px

            `
        }
    }

    return ( 
        <Box align='center' margin={{top: '74px'}}>
            <Box width='70%'>
                <Grommet theme={theme}>
                <Form onSubmit={handleSubmit} value={formValues}>
                    <Box margin={{ vertical: '15px' }} background='#222E42' round='small'>
                        <Heading textAlign='center' color='#FCE181' level={2}>
                            Submit a question!
                        </Heading>
                    </Box>
                    <FormField required label='Title' name='title' htmlFor='new-question-title'>
                        <TextArea 
                            id='new-question-title'
                            name='title'
                            placeholder='Enter a descriptive question title.' 
                            value={formValues.title}
                            onChange={handleInput} />
                    </FormField>
                    <FormField label='Description' 
                        name='text' htmlFor='new-question-text'>
                        <Grommet theme={descrTheme}>
                        <TextArea
                            id='new-question-text'
                            name='text'
                            placeholder='Enter a detailed description of your question.' 
                            value={formValues.text}
                            onChange={handleInput} />
                        </Grommet>
                    </FormField>
                    <FormField label='Tags' name='tags' htmlFor='new-question-tags'>
                        <TextArea 
                            id='new-question-tags'
                            name='tags'
                            placeholder='Enter a list of topics related to your question (separated by a comma).' 
                            value={formValues.tags}
                            onChange={handleInput} />
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
