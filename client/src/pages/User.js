import {React, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import API from "../utils/API";

export default function User() {

    const {id} = useParams();

    const [user, setUser] = useState({
        userName: "",
        Services: [],
        Questions: [],
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
            {user.Services.map(service => <li key={service.id}>{service.name}</li>)}
            <h3>Questions</h3>
            {user.Questions.map(question => <li key={question.id}>{question.title}</li>)}
        </div>
    )
}
