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
        },
        Ratings: []
    }]);

    const [ratings, setRatings] = useState({});

    const handleInputChaged = event => {
        const { name, value } = event.target;
        switch (name) {
            case "answer":
                setAnswer({ ...answer, text: value });
                break;
            case "questionComment":
                setQuestionComment({ ...questionComment, text: value });
                break;
            case "anwerComment":
                break;
            default:
                break;
        }

    }

    const handleSubmit = async () => {

        if (answer) {

            await API.createAnswer(answer, props.userState.token).catch(err => console.log(err));

            setAnswer({ ...answer, text: "" });

            const newAnswers = await API.getAnswersByQuestion(id).catch(err => console.log(err));
            setAnswers(newAnswers.data);

        }
    }

    const handleAddQuestionComment = async () => {

        if(questionComment){
            
            await API.createQuestionComment(questionComment, props.userState.token).catch(err => console.log(err));
            
            const newQuestionComments = await API.getAllQuestionComments(id).catch(err => console.log(err));
            setQuestionComments(newQuestionComments.data);
            
            setQuestionComment(emptyQuestionComment);
        }

    }

    const HandleRating = async (rating, target, type) => {

        const newRating = {
            isPositive: rating,
            type: type,
            ref: target
        }

        await API.createRating(newRating, props.userState.token).catch(err => console.log(err));

        switch (type) {
            case "answer":
                const newAnswers = await API.getAnswersByQuestion(id);
                setAnswers(newAnswers.data);
                break;
            case "question":
                const newRatings = await API.getRating(id, "question");
                setRatings(newRatings.data);
                break;
            default:
                break;
        }
    }

    useEffect(async () => {
        const questionToShow = await API.getQuestionById(id).catch(err => console.log(err));
        setQuestion(questionToShow.data);

        const commentsToShow = await API.getAllQuestionComments(id).catch(err => console.log(err));;
        setQuestionComments(commentsToShow.data);

        const answerToShow = await API.getAnswersByQuestion(id).catch(err => console.log(err));;
        setAnswers(answerToShow.data);

        const ratingToShow = await API.getRating(id, "question").catch(err => console.log(err));;
        setRatings(ratingToShow.data);

    }, [])

    return (
        <div>
            <h1>Question Page: {id}</h1>
            <h2>{question.title}</h2>
            <p>{question.text}</p>
            <p>
                <strong>Rating</strong><br />
                <button onClick={() => { HandleRating(true, id, "question") }}>Up</button><button onClick={() => { HandleRating(false, id, "question") }}>Down</button>
            </p>
            <p>
                <strong>Up: {ratings.positive}</strong>
            </p>
            <p>
                <strong>Down: {ratings.negative}</strong>
            </p>
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
            <button onClick={handleAddQuestionComment}>Submit</button><br />
            <strong>Answers</strong>
            <ul>
                {answers.map(answer => {
                    return <li key={answer.id}>{answer.text}<br />
                        Up: {answer.Ratings.filter(rating => rating.isPositive).length} -
                        Down: {answer.Ratings.filter(rating => !rating.isPositive).length}<br />
                        <button onClick={() => HandleRating(true, answer.id, "answer")}>Up</button>
                        <button onClick={() => HandleRating(false, answer.id, "answer")}>Down</button><br />
                        <Link to={`/users/${answer.User.id}`}>{answer.User.userName}
                        </Link>
                    </li>
                })}
            </ul>
            <h2>Add your anwer</h2>
            <textarea name="answer" value={answer.text} onChange={handleInputChaged} /><br />
            <button onClick={handleSubmit}>Submit</button>

        </div>
    )
}