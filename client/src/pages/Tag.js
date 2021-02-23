import {React, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import API from '../utils/API';

export default function Tag() {
    const {id} = useParams();

    const [tag, setTag] = useState({
        name: "",
        description: "",
        Questions: [{
            title: ""
        }],
        Services: [{
            name: "",
            User: {
                userName: ""
            }
        }]
    });

    useEffect(()=>{
        API.getTagById(id).then(response => {
            setTag(response.data);
            console.log(response.data);
        }).catch(err => {
            console.log(`oops!`, err);
        });

    },[])

    return (
        <div>
            <h1>Tag Page: {id}</h1>
            <h2>{tag.name}</h2>
            <h3>Questions:</h3>
            <ul>
                {tag.Questions.map(question => <li key={question.id}><Link to={`/question/${question.id}`}>{question.title}</Link></li>)}
            </ul>
            <h3>Services:</h3>
            <ul>
                {tag.Services.map(service => <li key={service.id}><Link to={`/service/${service.id}`}>{service.name}</Link> - <Link to={`/users/${service.User.id}`}>{service.User.userName}</Link></li>)}
            </ul>
        </div>
    )
}
