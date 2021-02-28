import { React, useState, useEffect } from 'react';

import MessageBubble from './MessageBubble';

import messageAPI from '../utils/messageAPI';

export default function ThreadView(props) {

    const [messagesList, setMessagesList] = useState([]);

    const [newMsg, setNewMsg] = useState({newMsg: ''});

    const handleSend = async (event) => {
        event.preventDefault();
        await messageAPI.sendMessage(props.selectedThread, props.userState.token);
        setNewMsg({newMsg: ''});
    }
    const handleChange = (event) => {
        event.preventDefault();
        setNewMsg({newMsg: event.target.value});
    }

    useEffect( async () => {
        const messages = (await messageAPI.getThreadMessages(props.selectedThread, props.userState.token)).data;
        console.log(messages);
        setMessagesList(messages);
    }, [props.selectedThread]);

    return (
        <div>
            {messagesList.map( (e) => {
                return <MessageBubble sentOrRecieved='sent' body={e.body} date={e.createdAt}/>
            })}
            <form onSubmit={handleSend}>
                <input type='text' placeholder='Message...' 
                    onChange={handleChange} 
                     value={newMsg.newMsg}></input>
            </form>
        </div>
    )
}
