import { React, useState } from 'react'
import { Link } from "react-router-dom";
import API from "../utils/API";

export default function Signin() {

    const [formObj, setFormObj] = useState({
        userName: "",
        password: ""
    });

    const [userState, setUserState] = useState({
        id: "",
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        isSignedIn: false,
        token: ""
    });

    const handleInputChanged = event => {
        const { name, value } = event.target;
        setFormObj({ ...formObj, [formObj[name]]: value })
    }

    const handleSubmit = event => {
        event.preventDefault();

        API.signIn(formObj).then(response => {
            console.log(response);
            setUserState({
                id: response.data.id,
                userName: response.data.user.userName,
                firstName: response.data.user.firstName,
                lastName: response.data.user.lastName,
                email: response.data.user.email,
                isSignedIn: true,
                token: response.data.token
            });
        })
    }

    return (
        <div>
            <h1>Sign In</h1>
            user name:
            <input name="userName" value={formObj.userName} onChange={handleInputChanged} /><br />
            password:
            <input name="password" value={formObj.password} onChange={handleInputChanged} /><br />
            <button onClick={handleSubmit}>Sign in</button>
        </div>
    )
}
