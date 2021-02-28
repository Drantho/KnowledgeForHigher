import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from "../utils/API";
import { Box, Grid } from 'grommet';
import QuestionBox from '../components/QuestionBox'
import Question from '../components/Question'
import UserTags from '../components/UserTags'
import FollowedServices from '../components/FollowedServices'
import Tags from '../components/Tags'

export default function UserHome(props) {
    console.log(props)
    const [tags, setTags] = useState([
        {
            id: "",
            name: "",
            show: true
        }
    ]);

    const [filter, setFilter] = useState(false);

    const [services, setServices] = useState([]);

    const [questions, setQuestions] = useState([]);

    const fillFeeds = async tagsToFeed => {
        const questionsToFeed = await API.getTagQuestionFeed({ tags: tagsToFeed }, props.userState.token);
        setQuestions(questionsToFeed.data);

        const servicesToFeed = await API.getTagServiceFeed({ tags: tagsToFeed }, props.userState.token);
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
                        <Link to={`/question/${question.id}`}>{question.title}</Link><br />
                        {question.Tags.map(tag => <span key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link> </span>)}
                    </li>
                })}
            </ul> */}
            {/* <h3>Services</h3>
            <ul>
                {services.map(service => {
                    return <li key={service.id}>
                        <Link to={`/service/${service.id}`}>{service.name}</Link> - <Link to={`/users/${service.UserId}`}>{service.User.userName}</Link><br />
                        {service.Tags.map(tag => <span id={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link> </span>)}
                    </li>
                }
                )}
            </ul> */}

            <Grid
                areas={[
                    ['blank3', 'blank3', 'blank3'],
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
                <Box gridArea="blank3" height="500px" />

                <Box gridAreah="myTags">
                    <UserTags />
                    <Box direction="row">
                        {tags.map(tag => <Tags key={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link><button onClick={() => handleHideTag(tag.name)}>Hide Tag</button></Tags>)}
                    </Box>
                </Box>

                <Box gridArea="main" height="flex">
                    <QuestionBox />
                </Box>

                <Box gridArea="question" pad="5px">
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