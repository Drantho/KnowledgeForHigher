import { React, useState, useEffect } from 'react';

import { Text, Box } from 'grommet';

import API from '../utils/API';

import UserFeedComment from './UserFeedComment';
import UserFeedQuestion from './UserFeedQuestion';

export default function UserFeed(props) {

    const [ entityList, setEntityList ] = useState([]);

    useEffect( async () => {

        const services = (await API.getServicesByUser(props.userState.id)).data;
        const questions = (await API.getQuestionByUser(props.userState.id)).data;
        const answers = (await API.getAnswersByUser(props.userState.id)).data;
        const comments = (await API.getCommentsByUser(props.userState.id)).data;
        const ratings = (await API.getRatingsByUser(props.userState.id)).data;

        services.forEach(e => (e.entityType = 'service' ))
        questions.forEach(e => (e.entityType = 'question' ))
        answers.forEach(e => (e.entityType = 'answer' ))
        comments.forEach(e => (e.entityType = 'comment' ))
        ratings.forEach(e => (e.entityType = 'rating' ))

        const entities = [...services, ...questions, ...answers, ...comments, ...ratings];

        entities.sort( (a, b) => {
            if (a.createdAt > b.createdAt) {
                return 1;
            } else if (a.createdAt < b.createdAt) {
                return -1;
            } else {
                return 0;
            }
        } );
        console.log(entities);
        setEntityList(entities);

    }, []);

    return (
        <Box margin={{top: '30px'}} gap='small'>
            {
                entityList.map( e => {
                    switch (e.entityType) {
                        case 'comment':
                            return <UserFeedComment  />
                        case 'question':
                            return <UserFeedQuestion userState={props.userState} question={e} />
                    }
                })
            }
            
        </Box>
    )
}
