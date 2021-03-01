import React, { useState } from 'react'
import API from "../utils/API";
import { useHistory } from 'react-router-dom';
import { Box, FormField, Grid, TextArea, Button} from 'grommet';
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
        <div>
            {/* <h1>Ask Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Question:
                </label>
                <input name="title" value={formObj.title} onChange={handleInputChanged} /><br />
                <label htmlFor="text">
                    Details:
                </label>
                <textarea name="text" value={formObj.text} onChange={handleInputChanged} /><br />
                <label htmlFor="tags">
                    Tags
                    </label>
                <textarea name="tagsString" value={formObj.tagsString} onChange={handleInputChanged} placeholder="enter topics separated by commas." /><br />
                <button type="submit" onClick={handleSubmit}>Ask Question</button>
            </form> */}

            <Grid
                areas={[
                    ['blank', 'blank3', 'blank2'],
                    ['blank', 'main', 'blank2'],
                    ['blank', 'question', 'blank2'],
                    ['blank', 'question', 'blank2']
                ]}
                columns={['1/4', 'flex', '1/4']}
                rows={['50px']}
                gap="small"
                responsive="true"
            >


                <Box gridArea="main" height="flex" margin={{ "bottom": "50px" }}>
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
                                <form onSubmit={handleSubmit}>
                                <Box gridArea="title">
                                    <FormField  htmlFor="text-area" border>
                                        <TextArea id="text-area" placeholder="Question Title" name="title" value={formObj.title} onChange={handleInputChanged} />
                                    </FormField>
                                </Box>

                                <Box gridArea="details" width="900px" height="400px">
                                    
                                    <TextArea id="text-area" placeholder="Description"  focusIndicator="true" fill name="text" value={formObj.text} onChange={handleInputChanged}/>
                                   
                                </Box>

                                <Box gridArea="tags" >
                                    <FormField  htmlFor="text-area" border>
                                        <TextArea id="text-area" placeholder="Enter topics separated by commas" name="tagsString" value={formObj.tagsString} onChange={handleInputChanged} />
                                    </FormField>
                                </Box>

                                {/* <pre>{JSON.stringify(props,null,4)}</pre> */}
                                
                                <Box gridArea="button" >
                                    <Button type="submit" onClick={handleSubmit}>Ask Question</Button>
                                </Box>
                                </form>
                            </Grid>

                        </Box>
                    </Box>

                </Box>

            </Grid>


        </div>
    )
}
