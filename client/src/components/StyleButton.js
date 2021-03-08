import { React, useEffect, useState } from 'react';

import { Grommet, Box, Tip, Button, Text } from 'grommet';
import { Bold, Italic, Underline } from 'grommet-icons';

export default function StyleButton(props) {

    const [icons, setIcons] = useState({});
 
    useEffect( () => {
        setIcons({
            'Bold': <Bold color={getColor()} />,
            'Underline': <Underline color={getColor()} />,
            'Italic': <Italic color={getColor()} />,
        });
       
    }, [props.disabled, props.active] );

    const getColor = (style) => {
        if (props.disabled) {
            return 'rgba(0,0,0,0.1)';
        }

        if (props.active) {
            return 'black';
        } 

        return 'gray';
    }

    const onClick = (event) => {
        event.preventDefault();
        if (props.disabled) {
            return;
        } 
        
        props.onToggle(props.style);
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
        <Tip content={<Text size='small'>{props.label}</Text>}>
            <Button onMouseDown={onClick}>
                <Box margin={{top: '4px'}} pad={{ horizontal: '8px' }}>
                    {icons[props.label]}
                </Box>
            </Button>
        </Tip>
        </Grommet>
    )

}