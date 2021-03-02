import React from 'react';
import { Box, Button, Grid, Text} from 'grommet';


export default function ProfileBox() {

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
                    <Button id="addButton" color="#FCE181"> <Text>Questions</Text></Button>
                </Box>

                <Box gridArea="search" pad="small">
                </Box>

                <Box gridArea="filter" pad="small">
                    <Button id="filterButton" color="#FCE181"><Text>Answers</Text></Button>
                </Box>
            </Grid>
        </Box>

    )
}


