import { React, useState } from 'react';

import { Box, Form, FormField, Text, TextInput, Button, Heading } from 'grommet';

import PostEditor from './PostEditor';

export default function AddServiceForm(props) {

    const [formValues, setFormValues] = useState({});

    const handleInput = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value})
    }

    return (
        <Box pad="5px">
            <Box margin={{ vertical: '15px' }} background='#222E42' round='small'>
                <Heading textAlign='center' alignSelf="center" color='#FCE181' level={3}>
                    Add a service
                </Heading>
            </Box>
            <Form>
                <FormField label='Service Name' 
                    name='title'
                    htmlFor='title'>
                    <TextInput name='title' value={formValues.title} onChange={handleInput} />
                </FormField>
                <PostEditor getDraftValue={ 
                        val => { setFormValues({ ...formValues, text: JSON.stringify(val) }) }
                    } controlledInput={formValues.text}
                    placeholder='Enter a detailed description of your service...' />
            </Form>
        </Box>
    )
}
