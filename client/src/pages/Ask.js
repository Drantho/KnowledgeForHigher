import React, { useState } from 'react'
import API from "../utils/API";
import { useHistory } from 'react-router-dom';

export default function Ask() {
    const history = useHistory();
    
    const [formObj, setFormObj] = useState({
        title: "",
        text: "",
        user: 1
    });
    
    const handleInputChanged = event => {
        const {name, value} = event.target;
        setFormObj({
            ...formObj,
            [name]: value
        });
    }
    
    const handleSubmit = event => {
        event.preventDefault();
    
        API.createQuestion(formObj).then(response => {
            history.push('profile');
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
                <input name="title" value={formObj.title} onChange={handleInputChanged}/>
                <label htmlFor="text">
                    Details:                    
                </label>
                <textarea name="text" value={formObj.text} onChange={handleInputChanged}/>
                <button type="submit" onClick={handleSubmit}>Ask Question</button>
            </form>
        </div>
    )
}
