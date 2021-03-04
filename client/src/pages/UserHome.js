import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from "../utils/API";
import { Box, Grid, Grommet } from 'grommet';
import QuestionBox from '../components/QuestionBox'
import Question from '../components/Question'
import UserTags from '../components/UserTags'
import PopularTags from '../components/PopularTags'
import FollowedServices from '../components/FollowedServices'
import Tags from '../components/Tags'
import Service from '../components/Service'
import MediaQuery from 'react-responsive'
import MobileSearchBar from '../components/MobileSearchBar'
import MobileHomeBar from '../components/MobileHomeBar';
import MobileNavbar from '../components/MobileNavbar'

export default function UserHome(props) {

    const [tags, setTags] = useState([]);

    const [popularTags, setPopularTags] = useState([]);

    const [filter, setFilter] = useState(false);

    const [services, setServices] = useState([]);

    const [questions, setQuestions] = useState([]);

    const [showAllMyTags, setShowAllMyTags] = useState(true);

    const [showAllPopularTags, setShowAllPopularTags] = useState(false);

    const [searchQuestions, setSearchQuestions] = useState([{
        id: "1",
        title: "",
        text: "",
        Tags: []
    }]);

    const [searchString, setSearchString] = useState("");


    const handleInputChanged = async event => {
        console.log('event.target.value', event.target.value);
        setSearchString(event.target.value);

        search(event.target.value);
    }

    const search = async query => {
        let searchResults = {};
        searchResults.data = [];
        if (query.length > 0) {
            searchResults = await API.getQuestionsBySearch(query).catch(err => console.log(err));
        }

        console.log(`search results: `, searchResults);
        if (searchResults.data.length > 0) {
            setQuestions(searchResults.data);
        } else {
            setQuestions([])
        }
    }

    const handleSearchClick = () => {
        search(searchString)
    }

    const fillFeeds = async tagsToFeed => {
        const questionsToFeed = await API.getTagQuestionFeed({ tags: tagsToFeed }, props.userState.token).catch(err => console.log(err));
        console.log(`questionsToFeed: `, questionsToFeed);
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
            popularTag.show = tagsToFeed.find(tag => tag.name === popularTag.name);
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

    const handleShowMyTags = () => {
        setTags(tags.map(tag => {
            tag.show = !showAllMyTags;
            return tag;
        }));

        const tempPopular = popularTags.map(popularTag => {
            const foundTag = tags.find(tag => tag.name === popularTag.name)
            if (foundTag) {
                popularTag.show = foundTag.show
            }
            return popularTag;
        });

        setPopularTags(tempPopular);
        setShowAllMyTags(!showAllMyTags);
        fillFeeds(tags.concat(popularTags));
    }

    const handleShowPopularTags = () => {
        setPopularTags(popularTags.map(tag => {
            tag.show = !showAllPopularTags;
            return tag;
        }));

        const tempMy = tags.map(myTag => {
            const foundTag = popularTags.find(tag => tag.name === myTag.name)
            if (foundTag) {
                myTag.show = foundTag.show
            }
            return myTag;
        });

        setTags(tempMy);
        setShowAllPopularTags(!showAllMyTags);
        fillFeeds(tags.concat(popularTags));
    }

    const [showQuestion, setShowQuestion] = useState(true)

    const toggleQuestion = () => {
        setShowQuestion(!showQuestion)
    }

    const globalGrommetTheme = {
        global: {
          focus: {
            border: {
              color :'#FCE181'
            }
          },
        }
      }

    return (
        <Grommet theme={globalGrommetTheme}>
            <MediaQuery minDeviceWidth={1000}>
                <Box margin={{ top: "75px" }}>
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

                        <Box gridArea="search" ><QuestionBox searchString={searchString} handleInputChanged={handleInputChanged} handleSearchClick={handleSearchClick} /></Box>

                        {/* =========================================================== */}

                        <Box gridArea="myTags" >
                            <div onClick={handleShowMyTags}>
                                <UserTags />
                            </div>
                            <Box style={{ flexWrap: "wrap" }} direction="row" width="400px" margin={{ "left": "25px", "right": "150px", "bottom": "10px" }}>
                                {tags.map(tag => <Tags key={tag.id}><Link to={`/tag/${tag.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{tag.name}</Link><img src={tag.show ? `./assets/images/show.png` : `./assets/images/hide.png`} style={{ cursor: "pointer", position: "relative", top: "3px", left: "8px" }} onClick={() => handleHideTag(tag.name)} /></Tags>)}
                            </Box>

                            <div onClick={handleShowPopularTags}>
                                <PopularTags />
                            </div>
                            <Box style={{ flexWrap: "wrap" }} direction="row" width="400px" margin={{ "left": "25px", "right": "150px", "bottom": "10px" }}>
                                {popularTags.map(tag => <Tags key={tag.id}><Link to={`/tag/${tag.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>{tag.name}</Link><img src={tag.show ? `./assets/images/show.png` : `./assets/images/hide.png`} style={{ cursor: "pointer", position: "relative", top: "3px", left: "8px" }} onClick={() => handleHideTag(tag.name)} /></Tags>)}
                            </Box>
                        </Box>

                        <Box gridArea="main" height="flex" background="#f0f0f0">

                        </Box>

                        <Box gridArea="question" margin={{ "top": "-10px", }} >
                            {questions.map(question => <Question props={question} />)}

                        </Box>

                        <Box gridArea="services">
                            <FollowedServices />
                            <Box>
                                {services.map(service => <Service props={service} />)}
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={1000}>
            <MobileNavbar tags={tags} handleHideTag={handleHideTag} toggleQuestion={toggleQuestion} popularTags={popularTags}/>
            <Box margin={{ top: "110px" }}>
                <Grid
                    areas={[
                        ['search'],
                        ['main'],
                        ['question'],
                        ['question']
                    ]}
                    columns={['flex']}
                    rows={['50px']}
                    gap="small"
                    responsive="true"
                >
                    <Box gridArea="blank1" />
                    <Box gridArea="blank2" />
                    <Box gridArea="blank3" />
                    <Box gridArea="blank4" />

                    <Box gridArea="search" ><MobileSearchBar searchString={searchString} handleInputChanged={handleInputChanged} handleSearchClick={handleSearchClick} /></Box>

                    <Box gridArea="main" height="flex" background="#f0f0f0" margin={{ "top": "10px", "left":"20px"}}>
                        {/* <MobileHomeBar/> */}
                    </Box>

                    <Box gridArea="question" margin={{ "top": "10px", "left":"20px"}} >
                        { showQuestion && 
                        questions.map(question => <Question props={question} />)
                        }
                        { !showQuestion &&
                        services.map(service => <Service props={service} />)
                        }
                    </Box>

                </Grid>
            </Box>
            </MediaQuery>
        </Grommet>
    )
}