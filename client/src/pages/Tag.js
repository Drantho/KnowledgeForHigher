import React from 'react';
import {useParams} from 'react-router-dom';

export default function Tag() {
    const {tag} = useParams();
    return (
        <div>
            <h1>Tag Page: {tag}</h1>
        </div>
    )
}
