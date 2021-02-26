import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from "../utils/API";

export default function UserHome(props) {

    const [tags, setTags] = useState([
        {
            id: "",
            name: "",
            show: true
        }
    ]);

    const [services, setServices] = useState([]);

    const [questions, setQuestions] = useState([])

    useEffect(()=> {
        API.getTagsByUser(props.userState.id).then(response => {
            console.log();
            setTags(response.data.map(tag => {
                tag.show = true;
                return tag;
            }));

            API.getTagQuestionFeed({tags: response.data}, props.userState.token).then(response => {
                console.log(`questions: `, response.data);
                setQuestions(response.data);
            });

            API.getTagServiceFeed({tags: response.data}, props.userState.token).then(response => {
                console.log(`services: `, response.data);
                setServices(response.data);
            }).catch(err => {
                console.log(err);
            })
        })

        console.log(tags.length);
    },[]);

    const handleHideTag = tagToHide => {
        const temp = tags.map(tag => {
            console.log(`${tag.name} ?= ${tagToHide}`);
            if(tag.name === tagToHide){
                tag.show = !tag.show;
            }
            return tag;
        })

        console.log(`hidden tags?: `, temp)

        setTags(temp);

        API.getTagQuestionFeed({tags: tags}, props.userState.token).then(response => {
            console.log(`questions: `, response.data);
            setQuestions(response.data);
        });

        API.getTagServiceFeed({tags: tags}, props.userState.token).then(response => {
            console.log(`services: `, response.data);
            setServices(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>User Home</h1>
            <h2>My feed</h2>
            <h3>Tags</h3>
            <ul>
            {tags.map(tag => <li key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link><button onClick={()=>handleHideTag(tag.name)}>Hide Tag</button></li>)}
            </ul>
            <h3>Questions</h3>
            <ul>
                {questions.map(question => {
                return <li key={question.id}>
                    <Link to={`/question/${question.id}`}>{question.title}</Link><br/>
                    {question.Tags.map(tag => <span key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link> </span>)}    
                </li>})}
            </ul>
            <h3>Services</h3>
            <ul>
                {services.map(service => {
                return <li key={service.id}>
                    <Link to={`/service/${service.id}`}>{service.name}</Link> - <Link to={`/users/${service.UserId}`}>{service.User.userName}</Link><br/>
                    {service.Tags.map(tag => <span id={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link> </span>)}
                </li>}
                )}
            </ul>
        </div>
    )
}
