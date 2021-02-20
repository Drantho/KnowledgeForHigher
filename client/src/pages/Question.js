import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import API from '../utils/API';

export default function Question() {
    const {id} = useParams(); 

    const [question, setQuestion] = useState({
        title: "",
        text: "",
        Tags: []
    });

    useEffect(() => {
        API.getQuestionById(id).then(response => {
            setQuestion(response.data);
            console.log(response.data);
        })
    }, [])

    return (
        <div>
            <h1>Question Page: {id}</h1>
            <h2>{question.title}</h2>
            <p>{question.text}</p>
            <strong>Tags</strong>
            <ul>
                {question.Tags.map(tag => <li key={tag.id}>{tag.name}</li>)}
            </ul>
        </div>        
    )
}