import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import API from '../utils/API';

export default function Question() {
    const {id} = useParams(); 

    const [question, setQuestion] = useState({
        title: "",
        text: "",
        Tags: [{
            id: "1"
        }],
    });

    const [answer, setAnswer] = useState({
        text: "",
        userId: 1,
        questionId: id
    });

    const [questionComment, setQuestionComment] = useState(""); 

    const [answers, setAnswers] = useState([{
        text: "",
        userId: "1",
        questionId: id,
        User: {
            userName: "",
            id: ""
        }
    }])

    const handleInputChaged = event => {
        setAnswer({...answer, text: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        API.createAnswer(answer).then(response => {
            console.log(response.data);
            setAnswer({...answer, text: ""});

        });
        
        API.getAnswersByQuestion(id).then(response => {
            setAnswers(response.data);
            console.log(response.data);
        });
    }

    useEffect(() => {
        API.getQuestionById(id).then(response => {
            setQuestion(response.data);
        });

        API.getAnswersByQuestion(id).then(response => {
            setAnswers(response.data);
            console.log(response.data);
        });

    }, []);

    return (
        <div>
            <h1>Question Page: {id}</h1>
            <h2>{question.title}</h2>
            <p>{question.text}</p>
            <strong>Tags</strong>
            <ul>
                {question.Tags.map(tag => <li key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link></li>)}
            </ul>
            <strong>Comments</strong>
            <ul>

            </ul>
            <textarea/>
            <strong>Answers</strong>
            <ul>
                {answers.map(answer => <li key={answer.id}>{answer.text} - <Link to={`/users/${answer.User.id}`}>{answer.User.userName}</Link></li>)}
            </ul>
            <h2>Add your anwer</h2>
            <form>
                <textarea name="text" value={answer.text} onChange={handleInputChaged}/><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>        
    )
}