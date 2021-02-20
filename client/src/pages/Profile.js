import {React, useEffect, useState} from 'react'
import API from "../utils/API";

export default function Profile() {

    const [questions, setQuestions] = useState([])

    useEffect(()=> {
        API.getQuestionByUser("1").then(response => {
            setQuestions(response.data);
        });
    }, [])

    return (
        <div>
            <h1>
                Profile Page
            </h1>            
            <ul>
                {questions.map(question => <li><strong>{question.title}</strong><p>{question.text}</p></li>)}
            </ul>
        </div>
    )
}
