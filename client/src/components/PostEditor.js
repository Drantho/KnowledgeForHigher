import { React, useState, useEffect } from 'react';

import { Editor, 
    EditorState, 
    SelectionState, 
    RichUtils, 
    Modifier, 
    convertToRaw } from 'draft-js';

import { Box } from 'grommet';

import './customDraftStyle.css';
import 'draft-js/dist/Draft.css';
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';

import StyleButton from './StyleButton';
 
export default function PostEditor(props) {

    // Create an empty editor state object
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // const [editorState, setEditorState] =
    //     useState(EditorState.createWithContent(convertFromRaw(JSON.parse(props.controlledContent))));
    
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = '';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' hidePlaceholder';
        }
    }

    const [editorRef, setEditorRef] = useState({});
    const [isFocused, setIsFocused] = useState(false);
    const [isCodeBlock, setIsCodeBlock] = useState(false);

    const INLINE_STYLES = [
        { label: 'Bold', style: 'BOLD' },
        { label: 'Underline', style: 'UNDERLINE' },
        { label: 'Italic', style: 'ITALIC' } 
    ];

    const BLOCK_TYPES = [
        { label: 'List', style: 'unordered-list-item' },
        { label: 'Ordered List', style: 'ordered-list-item' },
        { label: 'Block Quote', style: 'blockquote' },
        { label: 'Code', style: 'code-block' }
    ]

    const _toggleInlineStyle = (inlineStyle) => {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    const _toggleBlockType = (blockType) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
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
        if (!isFocused) {
            event.preventDefault();
            await editorRef.focus();
        }
    }

    const handleKeyCommand = async (command, state) => {
        // If backspace on empty block, remove block type
        if (command === 'backspace' && getCurrentBlock(editorState).getText().trim() === '' ) {
            setIsCodeBlock(false);
            clearBlockType();
        } 
    }

    const clearBlockType = () => {
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

    const getCurrentBlock = (state) => {
        const currentSelection = state.getSelection();
        const blockKey = currentSelection.getStartKey();
        return state.getCurrentContent().getBlockForKey(blockKey);
    }

    // Utility function to check current block's type
    const checkBlockType = (type) => {
        return RichUtils.getCurrentBlockType(editorState) === type;
    }

    const blockStyleFn = (contentBlock) => {
        if (contentBlock.getType() === 'code-block') {
            return 'codeBlockStyle';
        }
    }

    const handleReturn = (event) => {
        
        if (isSoftNewlineEvent(event)) {
            return 'not-handled';
        }

        if (checkBlockType('code-block')) {
            onChange(RichUtils.insertSoftNewline(editorState));
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
        onChange(RichUtils.onTab(event, editorState, 4));
        return 'handled';
    }

    return (
        <Box border='all' round='small' align='center' 
            pad={{horizontal: 'small', top: 'xsmall'}}
            onMouseDown={ handleFocus.bind(this) }>

            { isFocused ? 
            <Box animation={[{type: 'slideDown', duration: 150}]} 
                elevation={isFocused ? 'medium' : 'none'} 
                direction='row' 
                background='#FCE181'
                round='small'
                pad={{ horizontal: 'small', vertical: 'xsmall' }} >
                
                { INLINE_STYLES.map( (type) => 
                    <StyleButton active={editorState.getCurrentInlineStyle().has(type.style)}
                        label={type.label}
                        onToggle={_toggleInlineStyle}
                        style={type.style} disabled={isCodeBlock} />
                    )
                }

                { BLOCK_TYPES.map( (type) => 
                    <StyleButton 
                        active={type.style === getCurrentBlock(editorState).getType()} 
                        label={type.label} 
                        onToggle={_toggleBlockType}
                        setIsCodeBlock={setIsCodeBlock}
                        style={type.style} disabled={isCodeBlock} />
                    )
                }

            </Box> : <Box height='36px' /> }

            <Box fill pad={{vertical: 'small'}} align='left'> 
                <div className={className}>
                <Editor ref={setEditorRef}
                    editorState={editorState}
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    handleKeyCommand={handleKeyCommand}
                    blockStyleFn={blockStyleFn} 
                    handleReturn={handleReturn} 
                    onTab={onTab}
                    placeholder={props.placeholder} />
                </div>
            </Box>
        </Box>
    )
}
