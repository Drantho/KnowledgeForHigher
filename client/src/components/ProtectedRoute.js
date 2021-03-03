import React from 'react'
import {Route, Redirect} from "react-router-dom";

export default function ProtectedRoute(props) {
    return (
        <>
          {
              props.isSignedIn 
          ?
          <Route props={props}>
              {props.children}
          </Route>
          :
            <Redirect to={{pathname: "/splash", state: {from: props.location}}}/>
          }  
          
        </>
    )
}
