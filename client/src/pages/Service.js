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
    
    useEffect(() => {
        
        API.getServiceById(id).then(response => {
            setService(response.data);
            console.log(response.data);
        });

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
        </div>
    )
}
