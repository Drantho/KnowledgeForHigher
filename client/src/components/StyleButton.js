import { React, useEffect, useState } from 'react';

import { Grommet, Box, Tip, Button, Text } from 'grommet';
import { Bold, Italic, Underline } from 'grommet-icons';

export default function StyleButton(props) {

    const [disabled, setDisabled] = useState(false);
    const [icons, setIcons] = useState({});
 
    useEffect( () => {
        setIcons({
            'Bold': <Bold color={getColor('BOLD')} />,
            'Underline': <Underline color={getColor('UNDERLINE')} />,
            'Italic': <Italic color={getColor('ITALIC')} />,
        })
        setDisabled(props.disabled);
    }, [props.disabled] );

    // const icons = {
    //     'Bold': <Bold color={getColor('BOLD')} />,
    //     'Underline': <Underline color={getColor('UNDERLINE')} />,
    //     'Italic': <Italic color={getColor('ITALIC')} />,
    // }

    const getColor = (style) => {
        if (disabled) {
            return 'rgba(0,0,0,0.1)';
        }

        if (props.checkInlineStyle(style)) {
            return 'black';
        } 

        return 'gray';
    }

    const onClick = (event) => {
        if (disabled) {
            return;
        } 

        props.onClick.bind(props.thisTarget);
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
        <Grommet theme={buttonRowTheme}>
        <Tip content={<Text size='small'>{props.style}</Text>}>
            <Button onMouseDown={onClick}>
                <Box pad={{ horizontal: '8px' }}>
                    {icons[props.style]}
                </Box>
            </Button>
        </Tip>
        </Grommet>
    )

}