import {React, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import API from '../utils/API';
import { Box, Grid } from 'grommet';
import QuestionBox from '../components/QuestionBox'
import Question from '../components/Question'
import UserTags from '../components/UserTags'
import PopularTags from '../components/PopularTags'
import FollowedServices from '../components/FollowedServices'
import Tags from '../components/Tags'
import Service from '../components/Service'

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

                {/* =========================================================== */}

                {/* <Box gridArea="search" margin={{ "top": "-70px" }} ><QuestionBox searchString={searchString} handleInputChanged={handleInputChanged} handleSearchClick={handleSearchClick}/></Box> */}

                {/* =========================================================== */}


                <Box gridArea="main" height="flex" background="#f0f0f0">

                </Box>

                <Box gridArea="question" margin={{ "top": "-10px", }} >
                    {tag.Questions.map(question => <Question props={question} />)}

                </Box>

                <Box gridArea="services">
                    <FollowedServices />
                    <Box>
                        {/* {services.map(service => {
                            return <li key={service.id}>
                                <Link to={`/service/${service.id}`}>{service.name}</Link> - <Link to={`/users/${service.UserId}`}>{service.User.userName}</Link><br />
                                {service.Tags.map(tag => <span id={tag.id}><Link to={`/tag/${tag.id}`}>{tag.name}</Link> </span>)}
                            </li>
                        }
                        )} */}
                        {tag.Services.map(service => <Service props={service} />)}
                    </Box>
                </Box>

            </Grid>
        </div>
    )
}
