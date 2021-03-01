import { React, useEffect, useState } from 'react'
import API from "../utils/API";
import { useHistory, Link } from "react-router-dom"
import { Box, Grid, Anchor, Avatar } from 'grommet';
import ProfileBox from '../components/ProfileBox'
import UserTags from '../components/UserTags'
import FollowedServices from '../components/FollowedServices'
import Question from '../components/Question'

export default function Profile(props) {
    const history = useHistory();

    const [questions, setQuestions] = useState([]);
    const [services, setServices] = useState([{
        Tags: []
    }]);
    const [answers, setAnswers] = useState([]);

    const [formObj, setFormObj] = useState({
        name: "",
        description: "",
        price: 0,
        tagsArr: [],
        tagsStr: "",
        user: props.userState.id
    });

    const getServices = () => {
        API.getServicesByUser(props.userState.id).then(response => {
            setServices(response.data);
            console.log(`services: `, response.data);
        });
    }

    useEffect(() => {

            API.getQuestionByUser(props.userState.id).then(response => {
                console.log(`getQuestions: `, response);
                setQuestions(response.data);
            }).catch(err => {
                console.log(err);
            });

            API.getServicesByUser(props.userState.id).then(response => {
                setServices(response.data);
                console.log(`services: `, response.data);
            });
            
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;

        let tagsArr = formObj.tagsArr;
        if (name === "tagsStr") {
            tagsArr = value.split(",").map(str => str.trim());
        }

        setFormObj({
            ...formObj,
            [name]: value,
            tagsArr: tagsArr
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        setFormObj({
            ...formObj,
            price: parseFloat(formObj.price)
        });

        // TODO Convert to async so we can redirect when complete
        API.createService(formObj, props.userState.token).then(async response => {
            console.log(response.data);

            for (const element of formObj.tagsArr) {
                const id = await API.createTag({ name: element }, props.userState.token);
            }

            API.linkServiceToTag({
                service: response.data.id,
                tags: [formObj.tagsArr]
            }, props.userState.token).then(tagsLinkResponse => {
                getServices();
                setFormObj({
                    name: "",
                    description: "",
                    price: 0,
                    tagsArr: [],
                    tagsStr: "",
                    user: 1
                })
            });

        })
    }

    var Icon="/profilesample.png"
    return (
        <div>
            {/* <pre>
                {JSON.stringify(props, null, 4)}
            </pre>
            <h1>
                Profile Page
            </h1>
            <h2>My Questions</h2>
            <p>TODO: user id hard coded - change to logged in user</p>
            <ul>
                {questions.map(question => <li key={question.id}><Link to={`/question/${question.id}`}><strong>{question.title}</strong></Link><p>{question.text}</p></li>)}
            </ul>
            <h2>Add Service</h2>
            <label htmlFor="name">
                Service:
            </label>
            <input name="name" value={formObj.name} onChange={handleInputChange} /><br />
            <br />
            <label htmlFor="description">
                Description:
            </label>
            <input name="description" value={formObj.description} onChange={handleInputChange} /><br />
            <br />
            <label htmlFor="price">
                Price
            </label>
            <input name="price" value={formObj.price} onChange={handleInputChange} /><br />
            <br />
            <label htmlFor="tags">
                Price
            </label>
            <textarea name="tagsStr" value={formObj.tagsStr} onChange={handleInputChange} /><br />
            <br />
            <button onClick={handleSubmit}>Add Service</button>
            <h2>My Services {services.length}</h2>
            <ul>
                {services.map(service => {
                    return <li key={service.id}>
                        {service.name}<br />
                        {service.Tags.map(tag => <span key={tag.id}>{tag.name} - </span>)}
                    </li>
                })}
            </ul>
            <h2>My Answers</h2>
            <ul>
                {answers.map(answer => <li>{answer.text} - <Link to={`question/${answer.QuestionId}`}>question</Link></li>)}
            </ul> */}


            <Grid
                areas={[
                    ['blank3', 'blank3', 'blank3'],
                    ['profile', 'main', 'blank2'],
                    ['myTags', 'question', 'services'],
                    ['myTags', 'question', 'services']
                ]}
                columns={['1/4', 'flex', '1/4']}
                rows={['50px']}
                gap="small"
                responsive="true"
            >
               
                <Box gridArea="blank2" />
                <Box gridArea="blank3" />
               
                <Box gridArea="profile"  margin={{"left":"20px"}}>
                    <Anchor color="white">
                        <Link to='/home' style={{ color: 'inherit', textDecoration: 'inherit'}}><Avatar size="125px" src={Icon}/></Link>
                    </Anchor>
                </Box>

                <Box gridAreah="myTags">
                    <UserTags />
                    <Box direction="row" width="400px" margin={{"left":"25px","right":"150px","bottom":"10px"}}>
                        
                    </Box>
                </Box>

                <Box gridArea="main" height="flex" margin={{"bottom":"50px"}}>
                    <ProfileBox/>
                </Box>
               
                    <Box gridArea="question" pad="5px" margin={{"top":"-50px"}}>
                        {questions.map(question => <Question props={question} />)}
                
                    </Box>
    
                <Box gridArea="services">
                    {/* <FollowedServices /> */}
    
                </Box>

            </Grid>
        </div>


    )
}
