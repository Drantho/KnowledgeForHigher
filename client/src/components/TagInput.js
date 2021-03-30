import { React, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Box, Button, Grommet, Keyboard, Text, TextInput } from 'grommet';
import { FormClose } from 'grommet-icons';

import API from '../utils/API';
import Tag from './Tag';

export default function TagInput(props) {
    
    const history = useHistory();
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

    const handleRemove = (event) => {
        // props.setSelectedTags(
    //             props.selectedTags.filter( e => e !== args.name )
    //         )
    //         props.onRemoveTag(args.name);
    }

    const handleSuggestionSelect = (event) => {
        props.onAddTag(event.suggestion);
        setCurrentTag('');
        setSuggestions([]);
    }

    return (
        <Keyboard>
            <Box
                direction="row"
                align="center"
                pad='xsmall'
                ref={boxRef}
                style={{ 
                    borderRadius: '5px', 
                    boxShadow: 'inset 0 0 3px rgba(0,0,0,0.8)', 
                    minHeight: 'fit-content'
                }}
                flex
                wrap 
            >

                { props.selectedTags.map(e => <Tag
                                                key={e.name || e}
                                                userState={props.userState}
                                                filterable={props.filterable}
                                                {...props}
                                                filteredBy={props.filterable ? props.filteredBy[e.name || e] : undefined}
                                                tag={e}
                                                width={{ min: 'min-content' }} /> )}

                <Box 
                    flex={props.lineBreak ? false : true} 
                    style={{ minWidth: '120px', borderRadius: '2px' }}
                >
                    <TextInput
                        type="search"
                        plain
                        dropTarget={box}
                        suggestions={suggestions}
                        onChange={onInput}
                        value={currentTag}
                        onKeyPress={onEnter}
                        onSuggestionSelect={handleSuggestionSelect}
                        style={{ borderRadius: '3px' }}
                        {...props}
                    />
                </Box>
            </Box>
        </Keyboard>
    )
}
