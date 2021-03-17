import { React, useState, useCallback } from 'react';

import { Box, Button, Grommet, Keyboard, Text, TextInput } from 'grommet';
import { FormClose } from 'grommet-icons';

import API from '../utils/API';

export default function TagInput(props) {
    
    const [currentTag, setCurrentTag] = useState('');
    const [box, setBox] = useState();
    const boxRef = useCallback(setBox, []);

    const [ suggestions, setSuggestions ] = useState([]);

    const onInput = (event) => {
        setCurrentTag(event.target.value);

        if (event.target.value === '') {
            setSuggestions([]);
            return;
        }

        API.getTagBySearch(event.target.value).then( (response) => {
            setSuggestions(response.data.map( e => e.name ));
        }).catch( (err) => {
            console.log(err);
        });
    }

    const onEnter = (event) => {
        if (event.code === 'Enter') {
            event.preventDefault();
            props.onAddTag(currentTag);
            setCurrentTag('');
            setSuggestions([]);
        }
    };

    const handleSuggestionSelect = (event) => {
        props.onAddTag(event.suggestion);
        setCurrentTag('');
        setSuggestions([]);
    }

    const Tag = (args) => {
        
        const removeTag = (event) => {
            props.setSelectedTags(
                props.selectedTags.filter( e => e !== args.name )
            )
            props.onRemoveTag(args.name);
        }

        return (
            <Grommet theme={ {
                button: {
                    extend: `width: min-content`
                }
            } }>
                <Box align='center' background='#FCE181'
                    direction='row'
                    round='medium'
                    pad={{ horizontal: '16px', vertical: 'xxsmall' }}
                    margin={{ horizontal: 'xxsmall', vertical: 'xsmall' }}>
                    <Text margin={{ right: 'xsmall' }}>{args.name}</Text>
                    <Button onClick={removeTag}>
                        <FormClose size='18px' color='black' />
                    </Button>
                </Box>
            </Grommet>
        )
    }

    return (
        <Keyboard>
            <Box
                direction="row"
                align="center"
                pad='xsmall'
                border="all"
                ref={boxRef}
                wrap >

                {props.selectedTags.map( v => <Tag name={v} />)}

                <Box flex={props.lineBreak ? false : true} style={{ minWidth: '120px' }}>
                    <TextInput
                        type="search"
                        plain
                        dropTarget={box}
                        suggestions={suggestions}
                        onChange={onInput}
                        value={currentTag}
                        onKeyPress={onEnter}
                        onSuggestionSelect={handleSuggestionSelect}
                        {...props}
                    />
                </Box>
            </Box>
        </Keyboard>
    )
}
