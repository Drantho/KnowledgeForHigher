import { React, useState } from 'react';

import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Bold, Underline, List, OrderedList, WifiNone } from 'grommet-icons';
import { Grommet, Box, Button, Tip, Text } from 'grommet';
 
export default function PostEditor(props) {

    const [styleState, setStyleState] = useState({
        bold: false,
        underline: false,
        list: false
    });

    const [editorRef, setEditorRef] = useState({});
    const [isFocused, setIsFocused] = useState(false);
 
    const _onBoldClick = (event) => {
        event.preventDefault();
        setStyleState({ ...styleState, bold: !styleState.bold });
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }

    const _onUnderlineClick = (event) => {
        event.preventDefault();
        setStyleState({ ...styleState, underline: !styleState.underline });
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }
    const _onListClick = (event) => {
        event.preventDefault();
        setStyleState({ ...styleState, list: !styleState.list });
        setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
    }

    const [editorState, setEditorState] = useState( EditorState.createEmpty() );
    // const [editorState, setEditorState] =
    //     useState(EditorState.createWithContent(convertFromRaw(JSON.parse(props.controlledContent))));

    const onChange = (newEditorState) => {
        const contentState = newEditorState.getCurrentContent();
        setEditorState(newEditorState);
        if (newEditorState.getCurrentInlineStyle().has('BOLD')) {
            setStyleState({ ...styleState, bold: true });
        } 

        props.getDraftValue(convertToRaw(contentState));
    }

    const onFocus = (arg) => {
        if (!isFocused) {
            setIsFocused(true);
        } 
    }

    const onBlur = (arg) => {
        if (isFocused) {
            setIsFocused(false);
        }
    }

    const handleFocus = async (event) => {
        if (!isFocused) {
            event.preventDefault();
            await editorRef.focus();
        }
    }

    const handleKeyCommand = (command, state) => {
        // If backspace on empty block, set to unstyled
        if (command === 'backspace') {
            console.log(RichUtils.getCurrentBlockType(state));
            if (getCurrentBlock(editorState).getText() === '') {
                setEditorState(RichUtils.toggleBlockType(state, 'unordered-list-item'));
                console.log('resetting block format');

            }
        }
    }

    const getCurrentBlock = (state) => {
        const currentSelection = state.getSelection();
        const blockKey = currentSelection.getStartKey();
        return state.getCurrentContent().getBlockForKey(blockKey);
    }

    const getCurrentLetter = (state) => {
        const currentBlock = getCurrentBlock(state);
        const blockText = currentBlock.getText();
        return blockText[state.getSelection().getStartOffset() - 1];
    }

    const buttonRowTheme = {
        global: {
            active: {
                color: 'black'
            }
        },
        tip: {
            content: {
                background: 'white'
            }
        },
        button: {
            default: {
                padding: {
                    horizontal: '5px',
                    vertical: '0px'
                }
            }
        }
    }

    return (
        <Box border='all' round='small' align='center' 
            pad={{horizontal: 'small', top: 'xsmall'}}
            onMouseDown={ handleFocus.bind(this) }>
            <Grommet theme={buttonRowTheme}>
                {isFocused ? 
                    
                <Box animation={[{type: 'slideDown', duration: 150}]} 
                    elevation={isFocused ? 'medium' : 'none'} 
                    direction='row' 
                    background='#FCE181'
                    round='small'
                    pad={{ horizontal: 'small', vertical: 'xsmall' }} >
                    <Tip content={<Text size='small'>Bold</Text>}>
                        <Button
                            icon={<Bold color={styleState.bold ? 'black' : 'gray'} />}
                            onMouseDown={_onBoldClick.bind(this)} />
                    </Tip>
                    <Tip content={<Text size='small'>Underline</Text>}>
                        <Button
                            icon={<Underline color={styleState.underline ? 'black' : 'gray'} />}
                            onMouseDown={_onUnderlineClick.bind(this)} />
                    </Tip>
                    <Tip content={<Text size='small'>List</Text>}>
                        <Button
                            icon={<List color={styleState.list ? 'black' : 'gray'} />}
                            onMouseDown={_onListClick.bind(this)} />
                    </Tip>
                </Box> : <Box height='30px'></Box>}
            
            </Grommet>

            <Box fill pad={{vertical: 'small'}} align='left'> 
                <Editor ref={setEditorRef}
                    editorState={editorState}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    handleKeyCommand={handleKeyCommand} />
            </Box>
        </Box>
    )
}
