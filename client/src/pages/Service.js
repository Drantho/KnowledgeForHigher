import {React, useState, useEffect} from 'react'
import API from '../utils/API';
import { useParams, Link } from 'react-router-dom';

export default function Service(props) {

    const {id} = useParams();

    const emptyComment = {
        text: "",
        type: "service",
        ref: id,
        user: 1
    };    

    const [service, setService] = useState({
        id: "",    
        Tags: [],
        User: {}
    });

    const [comment, setComment] = useState(emptyComment);

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

    const [ratings, setRatings] = useState({});

    const handleInputChanged = event => {
        setComment({...comment, text: event.target.value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        API.createServiceComment(comment).then(response => {
            console.log(response);

            API.getAllServiceComments(id).then(response => {
                setComments(response.data);
            });
            setComment(emptyComment);
        })
    }

    const HandleRating = (rating, target, type) => {
        API.createRating(
            {
                isPositive: rating,
                type: type,
                ref: target 
            },
            props.userState.token    
        ).then(response => {
            console.log(response);
            API.getRating(id, "question").then(response => {
                setRatings(response.data)
            })
        }).catch(err => {
            console.log(err);
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
        });

        API.getRating(id, "service").then(response => {
            console.log(response);
            setRatings(response.data);
        });

    }, [])

    return (
        <div>
            <h1>Service Page: {service.id}</h1>
            <h2>{service.name}</h2>
            <h2>Provided By: <Link to={`/users/${service.User.id}`}>{service.User.userName}</Link></h2>
            <p>
                <strong>Rating</strong><br/>                
                <button onClick={()=>{HandleRating(true, id, "question")}}>Up</button><button onClick={()=>{HandleRating(false, id, "question")}}>Down</button>
            </p>
            <p>
                <strong>Up: {ratings.positive}</strong>
            </p>         
            <p>
                <strong>Down: {ratings.negative}</strong>
            </p> 
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
