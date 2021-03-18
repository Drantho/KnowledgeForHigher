import { React, useState, useEffect } from 'react';

import { Card, Box, Text, Anchor } from 'grommet';
import { Chat } from 'grommet-icons';
import API from '../utils/API';

export default function UserFeedComment(props) {

    const [commentTarget, setCommentTarget] = useState({
        User: {}
    });

    const [targetString, setTargetString] = useState('');

    useEffect( async () => {
        let commentTarget;

        if (props.comment.AnswerId) {
            commentTarget = (await API.getAnswerById(props.comment.AnswerId)).data;
            commentTarget.type = 'answer';
        }

        if (props.comment.QuestionId) {
            commentTarget = (await API.getQuestionById(props.comment.QuestionId)).data;
            commentTarget.type = 'question';
        }

        if (props.comment.ServiceId) {
            commentTarget = (await API.getServiceById(props.comment.ServiceId)).data;
            commentTarget.type = 'service';
        }
        
        setCommentTarget(commentTarget);
        setTargetString(
            <Anchor href={`/${commentTarget.type}/${commentTarget.id}`}>
                {`${commentTarget.User.userName}'s ${commentTarget.type}`}
            </Anchor>
        );
    }, []);

    return (
        <Card height={{ min: '50px' }}>
            <Box align='center' justify='between' pad='small' fill direction='row'>
                <Box gap='small' direction='row'>
                    <Box width='40px' align='center' justify='center'>
                        <Chat />
                    </Box>
                    <Box>
                        <Text size='small' weight='bold'>
                            {props.userState.id === props.targetUser.id ? 
                                'You' : props.targetUser.firstName } commented on {targetString}
                        </Text>
                    </Box>
                </Box>
                <Text size='small'>{props.comment.createdAt}</Text>
            </Box>
        </Card>
    )
}
