import { React, useEffect, useState } from 'react'
import API from "../utils/API";
import { useHistory, Link } from "react-router-dom"

export default function Profile(props) {
    const history = useHistory();

    const [questions, setQuestions] = useState([]);
    const [services, setServices] = useState([{
        Tags: []
    }]);
    const [answers, setAnswers] = useState([]);

    const [formObj, setFormObj] = useState({
        name: "",
        description: "",
        price: 0,
        tagsArr: [],
        tagsStr: "",
        user: props.userState.id
    });

    const [portraitSrc, setPortraitSrc] = useState("");

    const [portraitData, setPortraitData] = useState({});

    const getServices = () => {
        API.getServicesByUser(props.userState.id).then(response => {
            setServices(response.data);
            console.log(`services: `, response.data);
        });
    }

    useEffect(() => {

        API.getQuestionByUser(props.userState.id).then(response => {
            console.log(`getQuestions: `, response);
            setQuestions(response.data);
        }).catch(err => {
            console.log(err);
        });

        API.getServicesByUser(props.userState.id).then(response => {
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
        API.createService(formObj, props.userState.token).then(async response => {
            console.log(response.data);

            for (const element of formObj.tagsArr) {
                const id = await API.createTag({ name: element }, props.userState.token);
            }

            API.linkServiceToTag({
                service: response.data.id,
                tags: [formObj.tagsArr]
            }, props.userState.token).then(tagsLinkResponse => {
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

    const handleGetPhoto = (event) => {
        event.preventDefault();
        const file = event.target.files[0];        

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPortraitSrc(reader.result);
            setPortraitData(reader.result)
        }

        console.log(event.target.files);
    }

    const handleAddPhoto = async () => {

        console.log(`portraitData: `, portraitData);

        if(portraitData){
            const photoResult = await API.uploadPhoto(portraitData, props.userState.token).catch(err => console.log(err));
            console.log(photoResult);
        }

        

        
    }

    return (
        <div>
            <pre>
                {JSON.stringify(props, null, 4)}
            </pre>
            <h1>
                Profile Page
            </h1>
            <h2>My Questions</h2>
            <p>TODO: user id hard coded - change to logged in user</p>
            <ul>
                {questions.map(question => <li key={question.id}><Link to={`/question/${question.id}`}><strong>{question.title}</strong></Link><p>{question.text}</p></li>)}
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
                        {service.name}<br />
                        {service.Tags.map(tag => <span key={tag.id}>{tag.name} - </span>)}
                    </li>
                })}
            </ul>
            <h2>My Answers</h2>
            <ul>
                {answers.map(answer => <li>{answer.text} - <Link to={`question/${answer.QuestionId}`}>question</Link></li>)}
            </ul>
            <h2>Change My Portrait</h2>
            <input id="photoInput" type="file" name="image" onChange={handleGetPhoto}/>

                
            <div>
                <h3>Preview</h3>
                <img id="preview" alt="preview" src={portraitSrc}  style={{display: portraitSrc ? "block" : "none", width: "400px" }}/>
                <button onClick={handleAddPhoto}>upload</button>
            </div>
        </div>
    )
}
