import React from 'react';
import { Box, TextInput, Button, Grid } from 'grommet';
import { Search } from 'grommet-icons';
import './style.css';


export default function QuestionBox() {

    return (
        <Box
            justify="center"
            align="center"
            pad="5px"
            background="#222E42"
            round="5px"
            height="60px"
        >

            <Grid
                areas={[
                    ['add', 'search', 'filter'],
                ]}
                columns={['1/4', 'flex', '1/4']}
                rows={['45px']}
                gap="15px"
                responsive="true"
            >
                <Box gridArea="add" pad="small" >
                    <Button id="addButton" color="#FCE181"> Question </Button>
                </Box>

                <Box gridArea="search"  round="5px">
                    <Box fill align="center" justify="start">
                        <Box width="medium" gap="medium" >
                            <TextInput style={{background: "white"}} icon={<Search color="black"/>} reverse placeholder="search ..."  />
                        </Box>
                    </Box>
                </Box>

                <Box gridArea="filter" pad="small">
                    <Button id="filterButton" color="#FCE181"> Filter </Button>
                </Box>
            </Grid>
        </Box>

    )
}


