import {React, useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import API from "../utils/API";

export default function Browse() {

    const [questions, setQuestions] = useState([]);
    const [searchQuestions, setSearchQuestions] = useState([]);
    const [search, setSearch] = useState("");

    const handleInputChange = event => {     
        setSearch(event.target.value);

        API.getQuestionsBySearch(event.target.value).then(response => {
            setSearchQuestions(response.data);
        })
    }

    const handleSubmit = event => {
        event.preventDefault();

        API.getQuestionsBySearch(search).then(response => {
            setSearchQuestions(response.data);
        })
    } 

    useEffect(() => {
        API.getAllQuestions().then(response => {
            setQuestions(response.data);
        })
    }, [])

    return (
        <div>
            <h1>Browse Page</h1>
            <h2>Search Questions</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="search">Search</label>
                <input name="search" value={search} onChange={handleInputChange}/>
                <button type="submit">Search</button>
            </form>            
            <ul>
                {searchQuestions.map(question => <li key={question.id}><Link to={"/question/" + question.id}><strong>{question.title}</strong></Link></li>)}
            </ul>
            <hr/>
            <h2>All Questions</h2>
            <p>TODO: get paginated questions</p>           
            <ul>
                {questions.map(question => <li key={question.id}><Link to={"/question/" + question.id}><strong>{question.title}</strong></Link></li>)}
            </ul>
        </div>        
    )
}
