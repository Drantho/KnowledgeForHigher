import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import API from '../utils/API';

export default function Question(props) {
    const { id } = useParams();
    
    const emptyQuestionComment = {
        text: "",
        type: "question",
        ref: id
    }; 

    const [question, setQuestion] = useState({
        title: "",
        text: "",
        Tags: [{
            id: "1"
        }],
    });

    const [answer, setAnswer] = useState({
        text: "",
        question: id
    });

    const [questionComment, setQuestionComment] = useState(emptyQuestionComment);

    const [questionComments, setQuestionComments] = useState([]);

    const [answers, setAnswers] = useState([{
        text: "",
        userId: "",
        questionId: id,
        User: {
            userName: "",
            id: ""
        }
    }])

    const handleInputChaged = event => {
        const { name, value } = event.target;
        switch (name) {
            case "answer":
                setAnswer({ ...answer, text: value });
                break;
            case "questionComment":
                setQuestionComment({...questionComment, text: value});
                break;
            case "anwerComment":
                break;
            default:
                break;
        }

    }

    const handleSubmit = event => {
        event.preventDefault();
        API.createAnswer(answer, props.userState.token).then(response => {
            console.log(response.data);
            setAnswer({ ...answer, text: "" });
            API.getAnswersByQuestion(id).then(response => {
                setAnswers(response.data)
            })
        });

        API.getAnswersByQuestion(id).then(response => {
            setAnswers(response.data);
            console.log(response.data);
        });
    }

    const handleAddQuestionComment = event => {
        event.preventDefault();

        API.createQuestionComment(questionComment, props.userState.token).then(response => {
            console.log(response);

            API.getAllQuestionComments(id).then(response => {
                setQuestionComments(response.data);
            });

            setQuestionComment(emptyQuestionComment);
        })
    }

    useEffect(() => {
        API.getQuestionById(id).then(response => {
            setQuestion(response.data);
            console.log(`question data`, response.data);
        });

        API.getAllQuestionComments(id).then(response => {
            setQuestionComments(response.data);
            console.log(`all comments: `, response.data);
        });

        API.getAnswersByQuestion(id).then(response => {
            console.log(response.data);
            setAnswers(response.data);
        })
    }, [])

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
                {questionComments.map(comment => <li key={comment.id}>{comment.text} - <Link to={`/users/${comment.UserId}`}>{comment.User.userName}</Link></li>)}
            </ul>
            <label htmlFor="questionComment">
                Comment
            </label><br />
            <textarea name="questionComment" value={questionComment.text} onChange={handleInputChaged} placeholder="comments about the question itself" /><br />
            <button onClick={handleAddQuestionComment}>Submit</button><br/>
            <strong>Answers</strong>
            <ul>
                {answers.map(answer => {
                return <li key={answer.id}>{answer.text} - 
                    <Link to={`/users/${answer.User.id}`}>{answer.User.userName}
                    </Link>
                    </li>
                })}
            </ul>
            <h2>Add your anwer</h2>
            <form>
                <textarea name="answer" value={answer.text} onChange={handleInputChaged} /><br />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}