import React, { useState, useEffect } from 'react'
import API from "../utils/API";

export default function Ask() {
    
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
            console.log(response);
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
