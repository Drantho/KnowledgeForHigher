import { React, useState } from 'react';

import { Grommet, Box, Text } from 'grommet';

export default function Comment(props) {
    const [truncated, setTruncate] = useState(true);

    const expand = (event) => {
        setTruncate(!truncated);
    }

    const theme = {
        global: {
            colors: {
                focus: undefined
            }
        },
        text: {
            extend: {
                fontStyle: 'italic'
            }
        }
    };

    return (
        <Box fill>
            <Box fill margin='2px' pad={{vertical: '5px', horizontal: '10px'}} 
                onClick={expand}
                background={truncated ? undefined : 'rgba(252,225,129,0.8)'}>
                <Text size='16px' truncate={truncated}>{props.text}</Text>
                {truncated ? <></> :
                    <Grommet theme={theme}>
                    <Box margin={{top: '8px', left: '10px'}}>
                        <Text size='16px'>
                            {` - ${props.user.firstName} ${props.user.lastName}, ${props.date}`}
                        </Text>    
                    </Box>
                    </Grommet> }
            </Box>
            <Box height='2px' background='#222E42' />
        </Box>
    )
}
