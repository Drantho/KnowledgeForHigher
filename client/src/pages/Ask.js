import React, { useState } from 'react'
import API from "../utils/API";
import { useHistory } from 'react-router-dom';
import { Box, Form, FormField, TextArea, Button,Text} from 'grommet';
import AddQuestion from '../components/AddQuestion'


export default function Ask(props) {

    const [formValues, setFormValues] = useState({});

    const handleInput = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        // Convert tags string to array
        const tags = formValues.tags.split(',').map( e => e.trim());

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
            description: '',
            tags: ''
        });
    }

    return ( 
        <Box align='center' margin={{top: '74px'}}>
            <Box width='70%'>
                <Form onSubmit={handleSubmit} value={formValues}>
                    <FormField label='Title' name='title' htmlFor='new-question-title'>
                        <TextArea 
                            id='new-question-title'
                            name='title'
                            placeholder='Enter a descriptive question title.' 
                            value={formValues.title}
                            onChange={handleInput} />
                    </FormField>
                    <FormField label='Description' 
                        name='description' htmlFor='new-question-description'>
                        <TextArea 
                            id='new-question-description'
                            name='description'
                            placeholder='Enter a detailed description of your question.' 
                            value={formValues.description}
                            onChange={handleInput} />
                    </FormField>
                    <FormField label='Tags' name='tags' htmlFor='new-question-tags'>
                        <TextArea 
                            id='new-question-tags'
                            name='tags'
                            placeholder='Enter a list of topics related to your question (separated by a comma).' 
                            value={formValues.tags}
                            onChange={handleInput} />
                    </FormField>
                    <Button type='submit' label='Submit' />
                </Form>
            </Box>

        </Box>
    )
}
