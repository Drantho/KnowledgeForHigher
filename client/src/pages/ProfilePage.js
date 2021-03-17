import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Grommet, Grid, Box, Tabs, Tab, Text } from 'grommet';

import API from '../utils/API';

import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';
import UserEditForm from '../components/UserEditForm';

export default function ProfilePage(props) {

    const { id } = useParams();
    const [ user, setUser ] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        bio: '',
        portrait: '',
        email: '',
        id: parseInt(id)
    });

    useEffect(() => {
        API.getUserById(id).then( (response) => {
            console.log(response.data);
            setUser({
                ...user,
                userName: response.data.userName,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                portrait: response.data.portrait,
                email: response.data.email,
                bio: response.data.bio
            });
        }).catch( (err) => {
            console.log(err);
        });

    }, [])

    return (
        <Grid fill rows={[ 'auto', 'flex' ]}
            columns={[ 'auto', 'flex' ]}
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'sidebar', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] }
            ]}>
            <Box gridArea='header'>
                <Navbar userState={props.userState} />
            </Box>
            <Box margin={{ top: '90px' }} width='300px' gridArea='sidebar'>
                <UserSidebar user={user} userState={props.userState} />
            </Box>

            <Box gridArea='main' margin={{ top: '90px' }}>
                <Tabs>
                    <Tab title='Activity'>
                        
                    </Tab>
                    <Tab title='Questions'>
                        
                    </Tab>
                    <Tab title='Services'>
                        
                    </Tab>
                    { props.userState.id === user.id && 
                    
                        <Tab title='Edit'>
                            <Box pad='large'>

                                <UserEditForm 
                                    userState={props.userState} 
                                    setUserState={props.setUserState}/>
                            </Box>
                        </Tab>
                    }
                </Tabs>
            </Box>

        </Grid>
    )
}
