import { React, useState } from 'react';

import { Editor, EditorState, SelectionState, RichUtils, Modifier, convertToRaw, convertFromRaw } from 'draft-js';
import clearFormatting from 'draft-js-clear-formatting';
import { Bold, Underline, Italic, List, OrderedList, Code, BlockQuote } from 'grommet-icons';
import { Grommet, Box, Button, Tip, Text } from 'grommet';

import './customDraftStyle.css';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';

import EditorBarButton from './EditorBarButton';
 
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
        console.log(event.target);
        setStyleState({ ...styleState, orderedList: !styleState.orderedList });
        setEditorState(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
    }

    const _onBlockQuoteClick = (event) => {
        event.preventDefault();
        setEditorState(RichUtils.toggleBlockType(editorState, 'blockquote'))
    }

    // Toggle block type to 'Code'
    const _onCodeClick = (event) => {
        event.preventDefault();
        
        // const anchorKey = editorState.getSelection().getAnchorKey();
 
        // //Then based on the docs for SelectionState -
        // const currentContent = editorState.getCurrentContent();
        // const currentBlock = currentContent.getBlockForKey(anchorKey);

        // const newSelectionState = SelectionState.createEmpty().merge({
        //     anchorKey: anchorKey,
        //     anchorOffset: 0,
        //     focusKey: anchorKey,
        //     focusOffset: currentBlock.getLength()
        // });

        // // Selected Text
        // const selectedText = currentBlock.getText();
        // const contentWithoutStyles = Modifier.replaceText(
        //     editorState.getCurrentContent(),
        //     newSelectionState,
        //     selectedText,
        //     null,
        // );
            
        // const newstate = EditorState.push(
        //     editorState,
        //     contentWithoutStyles,
        //     'change-inline-style',
        // );
        clearStyle();

        setStyleState({...styleState, code: !styleState.code });
        setEditorState(RichUtils.toggleBlockType(editorState, 'code-block'));
    }

    const clearStyle = () => {
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

        const newState = EditorState.push(
            editorState,
            contentWithoutStyles,
            'change-inline-style',
        );

        setEditorState(newState);
    }

    const onChange = (newEditorState) => {
        const contentState = newEditorState.getCurrentContent();
        setEditorState(newEditorState);

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
        event.preventDefault();
        if (!isFocused) {
            await editorRef.focus();
        }
    }

    const handleKeyCommand = async (command, state) => {

        // If backspace on empty block, remove block type
        if (command === 'backspace' && getCurrentBlock(editorState).getText() === '' ) {
            if (checkBlockType('unordered-list-item')) {
                setEditorState(RichUtils.toggleBlockType(editorState, 'unordered-list-item'));
            } else if (checkBlockType('ordered-list-item')) {
                setEditorState(RichUtils.toggleBlockType(editorState, 'ordered-list-item'));
            } else if (checkBlockType('blockquote')) {
                setEditorState(RichUtils.toggleBlockType(editorState, 'blockquote'));
            } else if (checkBlockType('code-block')) {
                setEditorState(RichUtils.toggleBlockType(editorState, 'code-block'));
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

    // Utility function to check current block's type
    const checkBlockType = (type) => {
        return RichUtils.getCurrentBlockType(editorState) === type;
    }

    // Utililty function to check current selection's inline style
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

    // Set tab behavior when within code block
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
                    <Button 
                        disabled={checkBlockType('code-block')}
                        onMouseDown={_onBoldClick.bind(this)}>
                        <Box pad={{ horizontal: '8px' }}>
                        <Bold color={checkInlineStyle('BOLD') ? 'black' : 'gray'} />
                        </Box>
                    </Button>
                    </Tip>

                    <Tip content={<Text size='small'>Underline</Text>}>
                    <Button
                        disabled={checkBlockType('code-block')}
                        onMouseDown={_onUnderlineClick.bind(this)}> 
                        <Box pad={{horizontal: '8px'}}>
                        <Underline color={checkInlineStyle('UNDERLINE') ? 'black' : 'gray'} />
                        </Box>
                    </Button>
                    </Tip>

                    <Tip content={<Text size='small'>Italic</Text>}>
                    <Button 
                        disabled={checkBlockType('code-block')}
                        onMouseDown={_onItalicClick.bind(this)}>
                        <Box pad={{horizontal: '8px'}}>
                        <Italic color={checkInlineStyle('ITALIC') ? 'black' : 'gray'} />
                        </Box>
                    </Button>   
                    </Tip>

                    <Tip content={<Text size='small'>List</Text>}>
                    <Button 
                        disabled={checkBlockType('code-block')}
                        onMouseDown={_onListClick.bind(this)}>
                        <Box pad={{horizontal: '8px'}}>
                        <List color={checkBlockType('unordered-list') ? 'black' : 'gray'} />
                        </Box>
                    </Button>
                    </Tip>

                    <Tip content={<Text size='small'>Ordered List</Text>}>
                    <Button
                        disabled={checkBlockType('code-block')}
                        onMouseDown={_onOrderedListClick.bind(this)}>
                        <Box pad={{horizontal: '8px'}}>
                        <OrderedList color={checkBlockType('ordered-list') ? 'black' : 'gray'} />
                        </Box>
                    </Button>
                    </Tip>
                    
                    <Tip content={<Text size='small'>Block Quote</Text>}>
                    <Button 
                        disabled={checkBlockType('code-block')} name='block'
                        onMouseDown={_onBlockQuoteClick.bind(this)}>
                        <Box pad={{horizontal: '8px'}}>
                        <BlockQuote color={checkBlockType('blockquote') ? 'black' : 'gray'} />
                        </Box>
                    </Button>
                    </Tip>

                    <Tip content={<Text size='small'>Code Block</Text>}>
                    <Button onMouseDown={_onCodeClick.bind(this)}>
                        <Box pad={{horizontal: '8px'}}>
                        <Code color={checkBlockType('code-block') ? 'black' : 'gray'} />
                        </Box>
                    </Button>
                    </Tip>

                </Box> : <Box height='36px'></Box> }
            
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
