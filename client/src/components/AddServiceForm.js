import { React, useState } from 'react';

import { Box, Text, TextInput, Button } from 'grommet';

import PostEditor from './PostEditor';

export default function AddServiceForm(props) {

    const [formValues, setFormValues] = useState({});

    const handleInput = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value})
    }

    return (
        <Box pad="5px">
            <PostEditor getDraftValue={ 
                    val => { setFormValues({ ...formValues, text: JSON.stringify(val) }) }
                } controlledInput={formValues.text}
                placeholder='Enter a detailed description of your service...' />
        </Box>
    )
}
