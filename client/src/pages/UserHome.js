import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from "../utils/API";
import { Box, Grid, Button } from 'grommet';
import { FormView } from 'grommet-icons';
import QuestionBox from '../components/QuestionBox'
import Question from '../components/Question'
import UserTags from '../components/UserTags'
import FollowedServices from '../components/FollowedServices'
import Tags from '../components/Tags'

export default function UserHome(props) {

    const [tags, setTags] = useState([]);

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
        const tagsToFeed = await API.getTagsByUser(props.userState.id);
        setTags(tagsToFeed.data.map(tag => {
            tag.show = true;
            return tag;
        }));

        fillFeeds(tagsToFeed.data);

    }, [filter]);

    const handleHideTag = tagToHide => {
        const temp = tags.map(tag => {
            if (tag.name === tagToHide) {
                tag.show = !tag.show;
            }
            return tag;
        })

        setTags(temp);

        fillFeeds(tags);
    }

    return (
        <div>
            {/* <h1>User Home</h1>
            <h2>My feed</h2>
            <h3>Tags</h3>
            <ul>
                {tags.map(tag => <li key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link><button onClick={() => handleHideTag(tag.name)}>Hide Tag</button></li>)}
            </ul> */}
            {/* <h3>Questions</h3>
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
            </ul> */}
            {/* <h3>Services</h3>
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
            </ul> */}

            <Grid
                areas={[
                    ['blank3', 'search', 'blank4'],
                    ['blank1', 'main', 'blank2'],
                    ['myTags', 'question', 'services'],
                    ['myTags', 'question', 'services']
                ]}
                columns={['1/4', 'flex', '1/4']}
                rows={['50px']}
                gap="small"
                responsive="true"
            >
                <Box gridArea="blank1" />
                <Box gridArea="blank2" />
                <Box gridArea="blank3" />
                <Box gridArea="blank4" />
                <Box gridArea="search" margin={{"top":"-70px"}} ><QuestionBox/></Box>

                <Box gridAreah="myTags">
                    <UserTags />
                    <Box direction="row" width="400px" margin={{"left":"25px","right":"150px","bottom":"10px"}}>
                        {tags.map(tag => <Tags key={tag.id}><Link to={`/tag/${tag.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{tag.name}</Link><Button plain icon={<FormView />} onClick={() => handleHideTag(tag.name)} /></Tags>)}
                    </Box>
                </Box>

                <Box gridArea="main" height="flex">

                </Box>

                <Box gridArea="question" pad="5px" margin={{"top":"-50px"}}>
                    {questions.map(question => <Question props={question} />)}
                </Box>

                <Box gridArea="services">
                    <FollowedServices />
                    <Box>
                        {services.map(service => {
                            return <li key={service.id}>
                                <Link to={`/service/${service.id}`}>{service.name}</Link> - <Link to={`/users/${service.UserId}`}>{service.User.userName}</Link><br />
                                {service.Tags.map(tag => <span id={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link> </span>)}
                            </li>
                        }
                        )}
                    </Box>
                </Box>

            </Grid>
        </div>


    )
}