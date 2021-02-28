import React from 'react'

export default function MessageBubble(props) {
    return (
        <li className={props.sentOrReceived}>
            {props.body}
        </li>
    )
}
