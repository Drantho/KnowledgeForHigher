import React from 'react'
import {useParams} from 'react-router-dom';

export default function Question() {
    const {id} = useParams();
    return (
        <div>
            <h1>Question Page: {id}</h1>
        </div>
    )
}
