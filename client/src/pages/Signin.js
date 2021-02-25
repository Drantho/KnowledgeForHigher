import { React, useEffect } from 'react'
import { useHistory } from "react-router-dom";

export default function Signin(props) {
    const history = useHistory();

    useEffect(() => {
        if(props.userState.isSignedIn){
            history.push("/home");
        }
    },[]);

    const redirect = () => {
        history.push("/home")
    }

    return (
        <div>
            <h1>Sign In</h1>
            user name:
            <input name="userName" value={props.formObj.userName} onChange={props.handleInputChanged} /><br />
            password:
            <input name="password" value={props.formObj.password} onChange={props.handleInputChanged} /><br />
            <button onClick={() => {props.handleSubmit(redirect)}}>Sign in</button>
        </div>
    )
}
