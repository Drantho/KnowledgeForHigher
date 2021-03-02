import {React, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import API from "../utils/API";
import Thumbnail from "../components/Thumbnail/Index";

export default function User() {

    const {id} = useParams();

    const [user, setUser] = useState({
        userName: "",
        createdAt: "",
        portrait: "",
        Services: [{
            Tags: []
        }],
        Questions: [{
            Tags: []
        }],
        Answers: []

    });
    

    useEffect(async () => {
        const userFromAPI = await API.getUserById(id);
        const services = await API.getServicesByUser(id);
        const questions = await API.getQuestionByUser(id);
        const answers = await API.getAnswersByUser(id);

        console.log(`userFromApi: `, userFromAPI);

        const joined = new Date(userFromAPI.data.createdAt);

        setUser({userName: userFromAPI.data.userName, portrait: userFromAPI.data.portrait, createdAt: (joined.getMonth()+1)+"/"+joined.getDate()+"/"+joined.getFullYear(), Services: services.data, Questions: questions.data, Answers: answers.data})
    }, [])

    return (
        <div>
            <h1><Thumbnail portrait={user.portrait}/><br/>{user.userName}</h1>

            {/* <pre>
                {JSON.stringify(user, null, 4)}
            </pre> */}

            <p>
                <strong>Member since: </strong>
                {user.createdAt}
            </p>
            <h3>Services</h3>
            {user.Services.map(service => {
            return <li key={service.id}>
                <Link to={`/service/${service.id}`}>{service.name}</Link><br/>
                {service.Tags.map(tag => <span><Link to={`/tag/${tag.id}`} key={tag.id}>{tag.name}</Link> </span>)}
            </li>
            })}
            <h3>Questions</h3>
            {console.log(`user.Questions`, user.Questions)}
            {user.Questions.map(question => {
            return <li key={question.id}>
                <Link to={`/question/${question.id}`}>{question.title}</Link><br/>
                {question.Tags.map(tag => <Link to={`/tag/${tag.id}`} key={tag.id}> {tag.name}</Link>)}
            </li>
            })}
            <h3>Answers</h3>
            {user.Answers.map(answer => {
            return <li key={answer.id}>
                {answer.text} - 
                <Link to={`/question/${answer.QuestionId}`}>question</Link>
            </li>
            })}
        </div>
    )
}
