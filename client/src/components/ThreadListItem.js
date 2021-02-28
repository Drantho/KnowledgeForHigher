import React from 'react';

export default function ThreadListItem(props) {

    const caller = (event) => {
        props.onClick(props.threadId);
    }

    return (
        <li onClick={caller}>
            {props.toUser.firstName}
        </li>
    )
}
