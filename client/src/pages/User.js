import {React, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom';
import API from "../utils/API";

export default function User() {

    const {id} = useParams();

    const [user, setUser] = useState({
        userName: "",
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

        setUser({userName: userFromAPI.data.userName, Services: services.data, Questions: questions.data})
    }, [])

    return (
        <div>
            <h1>User Page: {id}</h1>
            <h2>{user.userName}</h2>

            {/* <p>
                <pre>
                    {JSON.stringify(user, null, 4)}
                </pre>            
            </p> */}
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
        </div>
    )
}
