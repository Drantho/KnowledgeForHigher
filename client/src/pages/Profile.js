import { React, useEffect, useState } from 'react'
import API from "../utils/API";

export default function Profile() {

    const [questions, setQuestions] = useState([]);
    const [services, setServices] = useState([]);
    const [formObj, setFormObj] = useState({
        name: "",
        description: "",
        price: 0,
        tagsArr: [],
        tagsStr: "",
        user: 1
    })

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
            tagsArr = formObj.tagsStr.split(",").map(str => str.trim());
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

        API.createService(formObj).then(async response => {
            console.log(response.data);

            formObj.tagsArr.forEach(element => {
                API.createTag({ name: element }).then(tagsResponse => {
                    API.linkServiceToTag({
                        service: response.data.id,
                        tags: [element]
                    }).then(tagsLinkResponse => {
                        console.log(`tags linked`);
                    });
                });                
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
            <h2>My Services</h2>
            <ul>
                {services.map(service => <li key={service.id}>{service.name}</li>)}
            </ul>
        </div>
    )
}
