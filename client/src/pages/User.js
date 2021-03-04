import { React, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import API from "../utils/API";
import { Box, Grid, Avatar, Button, Text, Stack, Paragraph } from 'grommet';
import OtherUserQuestion from '../components/OtherUserQuestion'
import UserAnswers from '../components/UserAnswers'
import UserServices from '../components/UserServices'
import BioBox from '../components/BioBox'
export default function User() {

    const { id } = useParams();

    const [user, setUser] = useState({
        userName: "",
        createdAt: "",
        portrait: "",
        Services: [{
            Tags: []
        }],
        Questions: [{
            Tags: [], User: {}, Ratings: []
        }],
        Answers: []

    });


    useEffect(async () => {
        const userFromAPI = await API.getUserById(id);
        const services = await API.getServicesByUser(id);
        const questions = await API.getQuestionByUser(id);
        const answers = await API.getAnswersByUser(id);

        console.log(`userFromApi: `, userFromAPI);

        const joined = new Date(userFromAPI.data.createdAt);

        setUser({ userName: userFromAPI.data.userName, portrait: userFromAPI.data.portrait, createdAt: (joined.getMonth() + 1) + "/" + joined.getDate() + "/" + joined.getFullYear(), Services: services.data, Questions: questions.data, Answers: answers.data, bio: userFromAPI.data.bio})
    }, [])

    const [showQuestion, setShowQuestion] = useState(true);

    const [showAnswer, setShowAnswer] = useState(false);

    const [showService, setShowService] = useState(false);

    const questionButton = () => {
        if (!showQuestion) {
            setShowQuestion(true);
            setShowAnswer(false);
            setShowService(false);
        }
    }

    const answerButton = () => {
        if (!showAnswer) {
            setShowAnswer(true);
            setShowQuestion(false);
            setShowService(false);
        }
    }

    const serviceButton = () => {
        if (!showService) {
            setShowService(true);
            setShowAnswer(false);
            setShowQuestion(false);
        }
    }

    return (
        <Box margin={{top:"75px"}}>

            <Grid
                areas={[
                    ['blank3', 'blank3', 'blank3'],
                    ['profile', 'main', 'blank2'],
                    ['bio', 'question', 'blank2'],
                    ['bio', 'question', 'blank2']
                ]}
                columns={['1/4', 'flex', '1/4']}
                rows={['50px']}
                gap="small"
                responsive="true"
            >

                <Box gridArea="blank2" />
                <Box gridArea="blank3" />

                <Box gridArea="profile" margin={{ "left": "20px" }} width="130px" direction="row">
                    <Stack>
                        
                            <Avatar size="125px" src={`https://res.cloudinary.com/drantho/image/upload/c_fill,w_125/${user.portrait}.jpg`} />
                     
                    </Stack>
                </Box>

                <Box gridArea="profile" margin={{ "left": "120px", "top": "50px" }} border width="200px" background="white" height="40px" round="5px">
                    <Text size="25px" margin={{ "left": "35px" }}> {user.userName} </Text>
                </Box>

                <Box gridArea="main" height="flex" margin={{ "bottom": "50px" }}>
                    <Box
                        justify="center"
                        align="center"
                        pad="5px"
                        background="#222E42"
                        round="5px"
                        height="60px"
                    >

                        <Grid
                            areas={[
                                ['question', 'answer', 'service'],
                            ]}
                            columns={['flex', 'flex', 'flex']}
                            rows={['45px']}
                            gap="15px"
                            responsive="true"
                        >

                            <Box gridArea="question">
                                <Button onClick={questionButton}><Text>Questions</Text></Button>
                            </Box>
                            <Box gridArea="answer">
                                <Button onClick={answerButton}><Text>Answers</Text></Button>
                            </Box>
                            <Box gridArea="service">
                                <Button onClick={serviceButton}><Text>Services</Text></Button>
                            </Box>
                        </Grid>
                    </Box>

                </Box>
                {showQuestion ?
                    <Box gridArea="question" pad="5px" margin={{ "top": "-50px" }}>
                        {user.Questions.map(question => <OtherUserQuestion props={question} />)}
                    </Box>
                    :
                    <div />
                }

                {showAnswer ?
                    <Box gridArea="question" pad="5px" margin={{ "top": "-50px" }}>
                        {user.Answers.map(answer => <UserAnswers props={answer} />)}
                    </Box>
                    :
                    <div />
                }

                {showService ?
                    <Box gridArea="question" pad="5px" margin={{ "top": "-50px" }}>
                        {user.Services.map(service => <UserServices props={service} />)}
                    </Box>
                    :
                    <div />
                }

                <Box gridArea="bio">
                    <BioBox/>
                    <Paragraph margin={{ "left": "25px", "right": "150px", "bottom": "10px" }}>
                        {user.bio}
                    </Paragraph>

                </Box>

            </Grid>

        </Box>
    )
}
