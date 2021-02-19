import React from 'react'
import {useParams} from 'react-router-dom';

export default function User() {
    const {userName} = useParams();
    return (
        <div>
            <h1>User Page: {userName}</h1>
        </div>
    )
}
