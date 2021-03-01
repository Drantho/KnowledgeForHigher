import React from 'react'
import {Link} from "react-router-dom";
import { Box } from 'grommet';

export default function NavbarTest() {
    return (
        <Box direction="row">
                <Box>
                    <Link to="/">
                        Home
                    </Link>
                </Box>
                <Box>
                    <Link to="/browse">
                        Browse
                    </Link>
                </Box>
                <Box>
                    <Link to="/ask">
                        Ask
                    </Link>
                </Box>
                <Box>
                    <Link to="/profile">
                        Profile
                    </Link>
                </Box>
                <Box>
                    <Link to="/question/1">
                        Question 1
                    </Link>
                </Box>
                <Box>
                    <Link to="/tag/1">
                        Tag 1
                    </Link>
                </Box>
                <Box>
                    <Link to="/Users/1">
                        User 1
                    </Link>
                </Box>
                <Box>
                    <Link to="/home">
                        User Home
                    </Link>
                </Box>
                <Box>
                    <Link to="/signin">
                        Sign In
                    </Link>
                </Box>
                <Box>
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </Box>
                <Box>
                    <Link to="/freddyjo">
                        404
                    </Link>
                </Box>
        </Box>
            
        
    )
}
