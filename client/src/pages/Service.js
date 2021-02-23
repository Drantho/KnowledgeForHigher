import {React, useState, useEffect} from 'react'
import API from '../utils/API';
import { useParams, Link } from 'react-router-dom';

export default function Service() {

    const {id} = useParams();

    const [service, setService] = useState({
        id: "",    
        Tags: [],
        User: {}
    });

    const [comment, setComment] = useState({
        text: "",
        type: "service",
        ref: id,
        user: 1
    });

    const [comments, setComments] = useState([{
        text: "",
        type: "service",
        ref: id,
        user: "",
        User: {
            id: "",
            userName: ""
        }        
    }]);

    const handleInputChanged = event => {
        setComment({...comment, text: event.target.value});
    }

    const handleSubmit = event => {
        event.preventDefault();

        API.createServiceComment(comment).then(response => {
            console.log(response);

            setComment({
                text: "",
                ref: id,
                user: 1
            });
        })
    }
    
    useEffect(() => {
        
        API.getServiceById(id).then(response => {
            setService(response.data);
            console.log(response.data);
        });

        API.getAllServiceComments(id).then(response => {
            setComments(response.data);
            console.log(response.data);
        })

    }, [])

    return (
        <div>
            <h1>Service Page: {service.id}</h1>
            <h2>{service.name}</h2>
            <h2>Provided By: <Link to={`/users/${service.User.id}`}>{service.User.userName}</Link></h2>
            <p>{service.description}</p>
            <p>
                <strong>Price: </strong>${service.price}
            </p>
            <strong>Tags:</strong>
            <ul>
                {service.Tags.map(tag => <li key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link></li>)}
            </ul>
            <strong>Comments: </strong>
            <ul>
                {comments.map(comment => <li key={comment.id}>{comment.text} - <Link to={`/users/${comment.UserId}`}>{comment.User.userName}</Link></li>)}
            </ul>
            <strong>Add Comment</strong>
            <textarea name="comment" value={comment.text} onChange={handleInputChanged}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}
