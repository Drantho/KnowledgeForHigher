import { React, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function Signup(props) {

    const history = useHistory();

    useEffect(() => {
        if(props.userState.isSignedIn){
            history.push("/home")
        }
    }, []);

    const redirect = () => {
        history.push("/home")
    }

    return (
        <div>
            <h1>Sign Up</h1>
            user name:
            <input name="userName" value={props.formObj.userName} onChange={props.handleInputChanged} /><br />
            first name:
            <input name="firstName" value={props.formObj.firstName} onChange={props.handleInputChanged} /><br />
            last name:
            <input name="lastName" value={props.formObj.lastName} onChange={props.handleInputChanged} /><br />
            email:
            <input name="email" value={props.formObj.email} onChange={props.handleInputChanged} /><br />
            password:
            <input name="password" value={props.formObj.password} onChange={props.handleInputChanged} /><br />            
            <button onClick={() => {props.handleSubmit(redirect)}}>Sign in</button>
        </div>
    )
}
