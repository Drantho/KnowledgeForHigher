import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from "../utils/API";

export default function UserHome(props) {

    const [tags, setTags] = useState([]);

    const [popularTags, setPopularTags] = useState([]);

    const [filter, setFilter] = useState(false);

    const [services, setServices] = useState([]);

    const [questions, setQuestions] = useState([]);

    const fillFeeds = async tagsToFeed => {
        const questionsToFeed = await API.getTagQuestionFeed({ tags: tagsToFeed }, props.userState.token).catch(err => console.log(err));
        setQuestions(questionsToFeed.data);

        const servicesToFeed = await API.getTagServiceFeed({ tags: tagsToFeed }, props.userState.token).catch(err => console.log(err));
        setServices(servicesToFeed.data);
    }

    useEffect(async () => {
        let tagsToFeed = await API.getTagsByUser(props.userState.id);   
        tagsToFeed = tagsToFeed.data.map(tag => {
            tag.show = true;
            return tag;
        })   
        setTags(tagsToFeed);

        let popularTagFeed = await API.getPopularTags();
        popularTagFeed = popularTagFeed.data;        

        popularTagFeed.map(popularTag => {
            popularTag.show = tagsToFeed.find(tag => tag.name === popularTag.name)            
        });

        setPopularTags(popularTagFeed);

        fillFeeds(tagsToFeed.concat(popularTagFeed));

    }, [filter]);

    const handleHideTag = tagToHide => {

        const temp = tags.map(tag => {
            if (tag.name === tagToHide) {
                tag.show = !tag.show;
            }
            return tag;
        })

        setTags(temp);

        const tempPopular = popularTags.map(tag => {
            if (tag.name === tagToHide) {
                tag.show = !tag.show;
            }
            return tag;
        })

        setPopularTags(tempPopular)

        fillFeeds(tags.concat(tempPopular));
    }

    return (
        <div>
            <h1>User Home</h1>
            <h2>My feed</h2>
            <h3>My Tags</h3>
            <ul>
                {tags.map(tag => <li key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link><img src={tag.show ? `./assets/images/show.png` : `./assets/images/hide.png`} onClick={() => handleHideTag(tag.name)}/></li>)}
            </ul>
            <h3>Popular Tags</h3>
            <ul>
                {popularTags.map(tag => <li key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link><img src={tag.show ? `./assets/images/show.png` : `./assets/images/hide.png`} onClick={() => handleHideTag(tag.name)}/></li>)}
            </ul>
            <h3>Questions</h3>
            <ul>
                {questions.map(question => {
                    return <li key={question.id}>
                        <Link to={`/question/${question.id}`}>{question.title}</Link> - 
                        up: {question.Ratings.filter(rating => rating.isPositive).length} - 
                        down: {question.Ratings.filter(rating => !rating.isPositive).length}
                        <br />
                        {question.Tags.map(tag => <span key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link> </span>)}
                    </li>
                })}
            </ul>
            <h3>Services</h3>
            <ul>
                {services.map(service => {
                    return <li key={service.id}>
                        <Link to={`/service/${service.id}`}>{service.name}</Link> -  
                        up: {service.Ratings.filter(service => service.isPositive).length} - 
                        down: {service.Ratings.filter(service => service.isPositive).length}
                        <br/>
                         - <Link to={`/users/${service.UserId}`}>{service.User.userName}</Link><br />
                        {service.Tags.map(tag => <span id={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link> </span>)}
                    </li>
                }
                )}
            </ul>
        </div>
    )
}
