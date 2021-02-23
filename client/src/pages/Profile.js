import { React, useEffect, useState } from 'react'
import API from "../utils/API";
import {useHistory} from "react-router-dom"

export default function Profile() {
    const history = useHistory();

    const [questions, setQuestions] = useState([]);
    const [services, setServices] = useState([{
        Tags: []
    }]);
    const [formObj, setFormObj] = useState({
        name: "",
        description: "",
        price: 0,
        tagsArr: [],
        tagsStr: "",
        user: 1
    });

    const getServices = () => {
        API.getServicesByUser("1").then(response => {
            setServices(response.data);
            console.log(`services: `, response.data);
        });
    }

    useEffect(() => {
        API.getQuestionByUser("1").then(response => {
            setQuestions(response.data);
        });

        API.getServicesByUser("1").then(response => {
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
        API.createService(formObj).then(async response => {
            console.log(response.data);

            for(const element of formObj.tagsArr){
                const id = await API.createTag({ name: element });                
            }

            API.linkServiceToTag({
                service: response.data.id,
                tags: [formObj.tagsArr]
            }).then(tagsLinkResponse => {
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

    return (
        <div>
            <h1>
                Profile Page
            </h1>
            <h2>My Questions</h2>
            <p>TODO: user id hard coded - change to logged in user</p>
            <ul>
                {questions.map(question => <li key={question.id}><strong>{question.title}</strong><p>{question.text}</p></li>)}
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
                    {service.name}<br/>
                    {service.Tags.map(tag => <span key={tag.id}>{tag.name} - </span>)}
                    </li>
                })}
            </ul>
        </div>
    )
}
