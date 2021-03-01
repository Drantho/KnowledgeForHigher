import { React, useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import {Box, Text, List} from 'grommet';

import ThreadListItem from '../components/ThreadListItem';
import ThreadView from '../components/ThreadView';

import messageAPI from '../utils/messageAPI';

export default function MessageView(props) {

    const [threadsList, setThreadsList] = useState([]);
    const [selectedThread, setSelectedThread] = useState({
        id: -1,
        toUser: -1
    });

    const handleThreadSelect = (id, toUser) => {
        setSelectedThread({ id, toUser });
    }

    useEffect( async () => {
        console.log(props.userState.id);
        const loadThreadsList = (await messageAPI.getThreads(props.userState.token)).data;
        setThreadsList(loadThreadsList);
        console.log(loadThreadsList);
    }, []);

    const listData = threadsList.map( (e) => {
        return {
            name: e.firstName + ' ' + e.lastName,
            username: e.userName,
            threadId: e.id
        }
    });

    return (
        <div>
            {threadsList.map( (e) => {
                return <ThreadListItem 
                            userState={props.userState}
                            toUser={e.user1 ? e.user1 : e.user2} 
                            key={e.id} 
                            threadId={e.id} 
                            onClick={handleThreadSelect}
                        />
            })}
            
            <ThreadView 
                userState={props.userState} 
                toUser={selectedThread.toUser} 
                selectedThread={selectedThread.id}/>
        </div>
    )
}
