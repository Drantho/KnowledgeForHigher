import React, { useState } from 'react'
import API from "../utils/API";
import { useHistory } from 'react-router-dom';

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
            <h1>Ask Page</h1>
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
            </form>
        </div>
    )
}
