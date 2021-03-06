import { React, useState } from 'react';

import { Editor, EditorState, SelectionState, RichUtils, Modifier, convertToRaw, convertFromRaw } from 'draft-js';
import { Bold, Underline, Italic, List, OrderedList, Code, Android } from 'grommet-icons';
import { Grommet, Box, Button, Tip, Text } from 'grommet';

import './customDraftStyle.css';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
 
export default function PostEditor(props) {

    // Create an empty editor state object
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // const [editorState, setEditorState] =
    //     useState(EditorState.createWithContent(convertFromRaw(JSON.parse(props.controlledContent))));

    const [styleState, setStyleState] = useState({
        bold: false,
        underline: false,
        italic: false,
        list: false,
        orderedList: false,
        code: false
    });

    const [editorRef, setEditorRef] = useState({});
    const [isFocused, setIsFocused] = useState(false);
    
    // Toggle in-line style to 'Bold'
    const _onBoldClick = (event) => {
        event.preventDefault();
        setStyleState({ ...styleState, bold: !styleState.bold });
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }

    // Toggle in-line style to 'Underlined'
    const _onUnderlineClick = (event) => {
        event.preventDefault();
        setStyleState({ ...styleState, underline: !styleState.underline });
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }

    // Toggle in-line style to 'Italic'
    const _onItalicClick = (event) => {
        event.preventDefault();
        setStyleState({ ...styleState, italic: !styleState.italic });
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    }

    // Toggle block type to 'Unordered List'
    const _onListClick = (event) => {
        event.preventDefault();
        setStyleState({ ...styleState, list: !styleState.list });
        setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
    }

    // Toggle block type to 'Ordered List'
    const _onOrderedListClick = (event) => {
        event.preventDefault();
        setStyleState({ ...styleState, orderedList: !styleState.orderedList });
        setEditorState(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
    }

    // Toggle block type to 'Code'
    const _onCodeClick = (event) => {
        event.preventDefault();
        
        const anchorKey = editorState.getSelection().getAnchorKey();
 
        //Then based on the docs for SelectionState -
        const currentContent = editorState.getCurrentContent();
        const currentBlock = currentContent.getBlockForKey(anchorKey);

        const newSelectionState = SelectionState.createEmpty().merge({
            anchorKey: anchorKey,
            anchorOffset: 0,
            focusKey: anchorKey,
            focusOffset: currentBlock.getLength()
        });

        // Selected Text
        const selectedText = currentBlock.getText();
        const contentWithoutStyles = Modifier.replaceText(
            editorState.getCurrentContent(),
            newSelectionState,
            selectedText,
            null,
        );
            
        const newstate = EditorState.push(
            editorState,
            contentWithoutStyles,
            'change-inline-style',
        );

        setStyleState({...styleState, code: !styleState.code });
        setEditorState(RichUtils.toggleBlockType(newstate, 'code-block'));
    }

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
        if (command === 'backspace' && getCurrentBlock(editorState).getText() === '' ) {
            setEditorState(RichUtils.toggleBlockType(state, 'unordered-list-item'));
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

    const checkBlockType = (type) => {
        return RichUtils.getCurrentBlockType(editorState) === type;
    }

    const checkInlineStyle = (style) => {
        return editorState.getCurrentInlineStyle().has(style);
    }

    const blockStyleFn = (contentBlock) => {
        if (contentBlock.getType() === 'code-block') {
            return 'codeBlockStyle';
        }
    }

    const handleReturn = (event) => {

        if (checkBlockType('code-block')) {
            onChange(RichUtils.insertSoftNewline(editorState));
            if (isSoftNewlineEvent(event)) {
                return 'not-handled';
            }
            return 'handled'
        }

        return 'not-handled';
    }

    const onTab = (event) => {
        if (checkBlockType('code-block')) {
            event.preventDefault();
            // Defining number of spaces to apply after tab press
            let tabIndent = '    ';

            // Getting variables to know text selection 
            let selectionState = editorState.getSelection();
            let anchorKey = selectionState.getAnchorKey();
            let currentContent = editorState.getCurrentContent();
            let currentContentBlock = currentContent.getBlockForKey(anchorKey);
            let start = selectionState.getStartOffset();
            let end = selectionState.getEndOffset();
            let selectedText = currentContentBlock.getText().slice(start, end);

            // Defining next state
            let nextState = Modifier.replaceText(currentContent, selectionState, tabIndent + selectedText);
            setEditorState(EditorState.push(editorState, nextState, 'indent'))
            return 'handled';
        }

        return 'not-handled';
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

                { isFocused ? 
                <Box animation={[{type: 'slideDown', duration: 150}]} 
                    elevation={isFocused ? 'medium' : 'none'} 
                    direction='row' 
                    background='#FCE181'
                    round='small'
                    pad={{ horizontal: 'small', vertical: 'xsmall' }} >
                    <Tip content={<Text size='small'>Bold</Text>}>
                        <Button disabled={checkBlockType('code-block')}
                            icon={<Bold color={checkInlineStyle('BOLD') ? 'black' : 'gray'} />}
                            onMouseDown={_onBoldClick.bind(this)} />
                    </Tip>
                    <Tip content={<Text size='small'>Underline</Text>}>
                        <Button disabled={checkBlockType('code-block')}
                            icon={<Underline color={checkInlineStyle('UNDERLINE') ? 'black' : 'gray'} />}
                            onMouseDown={_onUnderlineClick.bind(this)} />
                    </Tip>
                    <Tip content={<Text size='small'>Italic</Text>}>
                        <Button disabled={checkBlockType('code-block')}
                            icon={<Italic color={checkInlineStyle('ITALIC') ? 'black' : 'gray'} />}
                            onMouseDown={_onItalicClick.bind(this)} />
                    </Tip>
                    <Tip content={<Text size='small'>List</Text>}>
                        <Button disabled={checkBlockType('code-block')}
                            icon={<List color={checkBlockType('unordered-list') ? 'black' : 'gray'} />}
                            onMouseDown={_onListClick.bind(this)} />
                    </Tip>
                    <Tip content={<Text size='small'>Ordered List</Text>}>
                        <Button disabled={checkBlockType('code-block')}
                            icon={<OrderedList color={checkBlockType('ordered-list') ? 'black' : 'gray'} />}
                            onMouseDown={_onOrderedListClick.bind(this)} />
                    </Tip>
                    <Tip content={<Text size='small'>Code Block</Text>}>
                        <Button
                            icon={<Code color={checkBlockType('code-block') ? 'black' : 'gray'} />}
                            onMouseDown={_onCodeClick.bind(this)} />
                    </Tip>
                </Box> : <Box height='30px'></Box> }
            
            </Grommet>

            <Box fill pad={{vertical: 'small'}} align='left'> 
                <Editor ref={setEditorRef}
                    editorState={editorState}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    handleKeyCommand={handleKeyCommand}
                    blockStyleFn={blockStyleFn} 
                    handleReturn={handleReturn} 
                    onTab={onTab} />
            </Box>
        </Box>
    )
}
