import { React, useState, useEffect } from 'react';

import { Grommet, Box, Text, Anchor } from 'grommet';
import { useHistory } from 'react-router-dom';

export default function Comment(props) {
    const history = useHistory();
    const [truncated, setTruncate] = useState(true);
    const [ dateString, setDateString ] = useState('');

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

    useEffect( () => {
        const date = new Date(props.date);
        const dateStr
            = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) + ' ' +
                date.getDate();

        if (date.getFullYear() < new Date(Date.now()).getFullYear()) {
            setDateString(dateStr.concat(', ' + date.getFullYear()));  
        } else {
            let time = date.getMinutes();
            if (time < 10) {
                time = '0' + time;
            }
            let hours = date.getHours();
            if (hours > 12) {
                time = (hours - 12) + ':' + time + 'PM';
            } else if (hours === 12) {
                time = '12:' + time + 'PM';
            } else if (hours === 0) {
                time = '12:' + time + 'AM';
            } else {
                time = hours + ':' + time + 'AM';
            }
            setDateString(dateStr.concat(' at ', time));
        }

    }, [])

    return (
        <Box fill>
            <Box margin='2px' pad={{vertical: '5px', horizontal: '10px'}} 
                onClick={expand}
                background={truncated ? undefined : 'rgba(252,225,129,0.8)'}>
                <Text size='16px' truncate={truncated}>{props.text}</Text>
                {truncated ? <></> :
                    <Grommet theme={theme}>
                    <Box margin={{top: '8px', left: '10px'}}>
                        <Text size='11pt'>
                            {` - `}
                            <Anchor onClick={() => history.push(`/profile/${props.user.id}`)}>
                                {props.user.userName}
                            </Anchor>
                            {`, ${dateString}`} 
                        </Text>    
                    </Box>
                    </Grommet> }
            </Box>
            <Box height='2px' background='#222E42' />
        </Box>
    )
}
