import {React, useEffect, useState} from 'react'
import API from "../utils/API";

export default function Profile() {

    const [questions, setQuestions] = useState([]);

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
            <h2>My Questions</h2>
            <p>TODO: user id hard coded - change to logged in user</p>           
            <ul>
                {questions.map(question => <li key={question.id}><strong>{question.title}</strong><p>{question.text}</p></li>)}
            </ul>
        </div>
    )
}
