import { React, useState, useEffect } from 'react';

import { Grommet, Box, Text, Button, Tip } from 'grommet';
import { Up, Down } from 'grommet-icons';
import API from '../utils/API';

export default function Rating(props) {

    const handleRating = async (event) => {
        if (!props.userState.isSignedIn || props.userState.id === props.owner) {
            return;
        }

        let node = event.target;
        let up = false;

        // Hacky way of getting event.target.isPositive
        if ( node.ariaLabel ) {
            up = node.ariaLabel === 'Up' ? true : false;
        } else if ( node.parentNode.tagName === 'DIV' ) {
            up = node.parentNode.firstChild.ariaLabel === 'Up' ? true : false;
        } else {
            up = node.firstChild.ariaLabel === 'Up' ? true : false;
        }

        console.log(props.type);

        await API.createRating({
            isPositive: up, 
            type: props.type, 
            ref: props.reference
        }, props.userState.token).catch( (err) => { 
            console.log(err)
        });

        API.getRating(props.reference, props.type).then( (result) => {
            if (result.data.positive === ratings.positive &&
                result.data.negative === ratings.negative) {
                    return;
            }
            setRatings(result);
        }).catch( (err) => {
            console.log(err);
        });
    };

    const [ratings, setRatings] = useState({
        positive: 0,
        negative: 0
    });

    useEffect( () => {
        console.log('Getting ratings for ' + props.type + ' nummber ' + props.reference)
        API.getRating(props.reference, props.type).then( (result) => {
            setRatings(result.data);
            console.log(result.data);
        }).catch( (err) => {
            console.log(err);
        });
    }, []);

    const theme = {
        global: {
            colors: {
                focus: undefined
            }
        }
    }

    return (
        <Grommet theme={theme}>
        <Box onClick={e => e.stopPropagation()} 
            width={{ min: '24px' }} 
            margin={{ horizontal: 'medium' }} 
            justify='center' >
            {props.userState.isSignedIn && props.userState.id !== props.owner ?
                <Button onClick={handleRating}>
                    <Box>
                        <Up />
                        <Text margin={{ top: '-7px', bottom: '5px' }}
                            color='green'
                            alignSelf='center'>{ratings ? ratings.positive : ''}</Text>
                    </Box>
                </Button>
                :
                <Tip dropProps={{align: {bottom: 'top'}}} plain 
                    content={
                        <Box pad='xsmall' 
                            round='xsmall' 
                            background='#FCE181' 
                            width={{ max: '90px' }}>
                            <Text size='12px'>
                                {props.userState.id === props.owner ?
                                    `You cannot leave a rating on your own ${props.type}.` :
                                    'You must be signed in to leave a rating!'
                            }</Text>
                        </Box>}> 
                    <Button onClick={handleRating}>
                        <Box>
                            <Up />
                            <Text margin={{ top: '-7px', bottom: '5px' }}
                                color='green'
                                alignSelf='center'>{ratings ? ratings.positive : ''}</Text>
                        </Box>
                    </Button>
                </Tip>
            }

            <Box width='100%' height='2px' background='#222E42' />
            {props.userState.isSignedIn && props.userState.id !== props.owner ? 
                <Button onClick={handleRating}>
                    <Box>
                        <Text margin={{ top: '5px', bottom: '-7px' }}
                            color='red'
                            alignSelf='center'>{ratings ? ratings.negative : ''}</Text>
                        <Down />
                    </Box>
                </Button>
                : 
                    <Tip plain 
                        content={
                            <Box pad='xsmall' 
                                round='xsmall' 
                                background='#FCE181' 
                                width={{max: '90px'}}>
                                <Text size='12px'>
                                    {props.userState.id === props.owner ? 
                                        `You cannot leave a rating on your own ${props.type}.` :
                                        'You must be signed in to leave a rating!'
                                    }
                                </Text>
                            </Box>}>
                    <Button onClick={handleRating}>
                        <Box>
                            <Text margin={{ top: '5px', bottom: '-7px' }}
                                color='red'
                                alignSelf='center'>{ratings ? ratings.negative : ''}</Text>
                            <Down />
                        </Box>
                    </Button>
                </Tip>
            }
        </Box>
        </Grommet>
    )
}
