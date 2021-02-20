import React from 'react'
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/browse">
                        Browse
                    </Link>
                </li>
                <li>
                    <Link to="/ask">
                        Ask
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to="/question/1">
                        Question 1
                    </Link>
                </li>
                <li>
                    <Link to="/tag/1">
                        Tag 1
                    </Link>
                </li>
                <li>
                    <Link to="/Users/1">
                        User 1
                    </Link>
                </li>
                <li>
                    <Link to="/home">
                        User Home
                    </Link>
                </li>
                <li>
                    <Link to="/signin">
                        Sign In
                    </Link>
                </li>
                <li>
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link to="/freddyjo">
                        404
                    </Link>
                </li>
            </ul>
        </div>
    )
}
