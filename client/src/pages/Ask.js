import React, { useState } from 'react'
import API from "../utils/API";
import { useHistory } from 'react-router-dom';
import { Box, FormField, Grid, TextArea, Button,Text} from 'grommet';
import AddQuestion from '../components/AddQuestion'
export default function Ask(props) {
    const history = useHistory();

    const [formObj, setFormObj] = useState({
        title: "",
        text: "",
        user: 1,
        tagsString: "",
        tagsArray: []
    });

    const handleInputChanged = event => {
        const { name, value } = event.target;
        if (name === "tagsString") {
            const arr = value.split(",").map(element => element.trim());
            setFormObj({
                ...formObj,
                tagsString: event.target.value,
                tagsArray: arr
            });
        } else {
            setFormObj({
                ...formObj,
                [name]: value
            });
        }

    }

    const handleSubmit = async event => {
        event.preventDefault();

        API.createQuestion(formObj, props.userState.token).then(async response => {
            console.log(response);
            const id = response.data.id;

            // TODO convert to async so we can redirect when complete
            formObj.tagsArray.forEach(async element => {
                API.createTag({ name: element }, props.userState.token).then(tagResponse => {
                    API.linkTagToQuestion({
                        tags: [element],
                        question: response.data.id
                    }, props.userState.token).catch(err => {
                        console.log(err);
                    });
                });
            });

            for (const element of formObj.tagsArray) {
                const id = await API.createTag({ name: element })
            }

            API.linkTagToQuestion({
                tags: formObj.tagsArray,
                question: response.data.id
            }, props.userState.token).catch(err => {
                console.log(err);
                history.push("/profile")
            });

        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <Box margin={{top:"50px"}} fill="horizontal">

            <Grid
                areas={[
                    ['blank', 'blank3', 'blank2'],
                    ['blank', 'main', 'blank2'],
                    ['blank', 'question', 'blank2'],
                    ['blank', 'question', 'blank2']
                ]}
                columns={['flex', 'flex', 'flex']}
                rows={['50px']}
                gap="small"
                responsive="true"
            >


                <Box gridArea="main" height="flex" margin={{ "bottom": "50px" }} >
                    <AddQuestion/>
                </Box>

                <Box gridArea="question" pad="5px" margin={{ "top": "-50px" }}>
                    <Box>
                        <Box
                            justify="center"
                            align="center"
                            pad="10px"
                            background="#F3F3F3"
                            round="5px"
                        >

                            <Grid
                                areas={[
                                    ['title', 'title', 'title'],
                                    ['details', 'details', 'details'],
                                    ['tags', 'tags', 'tags'],
                                    ['blank', 'blank', 'button'],
                                ]}
                                columns={['flex', 'flex', 'flex']}
                                rows={['flex']}
                                responsive="true"
                            >
                                {/* <form onSubmit={handleSubmit}> */}
                                <Box gridArea="title">
                                 
                                    <TextArea id="text-area" fill="true" placeholder="Question Title" name="title" value={formObj.title} onChange={handleInputChanged} />
                                    
                                </Box>

                                <Box gridArea="details"  width="850px" height="300px">
                                    
                                    <TextArea id="text-area" placeholder="Description"  focusIndicator="true" fill="true" name="text" value={formObj.text} onChange={handleInputChanged}/>
                                   
                                </Box>

                                <Box gridArea="tags" >
                                    
                                    <TextArea id="text-area" fill="true" placeholder="Enter topics separated by commas" name="tagsString" value={formObj.tagsString} onChange={handleInputChanged} />
                                  
                                </Box>

                                <Box gridArea="button" background="#FCE181" round="50px" width="150px" margin={{"left":"100px", "top":"5px"}}>
                                    <Button type="submit" onClick={handleSubmit} margin={{"left":"20px", }}><Text weight="bold">Ask Question</Text></Button>
                                </Box>
                                {/* </form> */}
                            </Grid>

                        </Box>
                    </Box>

                </Box>

            </Grid>


        </Box>
    )
}
