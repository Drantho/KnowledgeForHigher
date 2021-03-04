import React from 'react';
import { Box, TextInput, Grid } from 'grommet';
import { Search } from 'grommet-icons';

export default function QuestionBox(props) {

    return (
        <Box
            justify="center"
            align="center"
            pad="5px"
            round="5px"
            height="60px"
         
        >

            <Grid
                areas={[
                    ['search', 'search', 'search'],
                ]}
                columns={['1/4', 'flex', '1/4']}
                rows={['45px']}
                gap="15px"
                responsive="true"
            >

                <Box gridArea="search"  round="5px">
                    <Box fill align="center" justify="start">
                        <Box width="350px" gap="medium" style={{ position: "fixed", left:"50%", top: -6}} margin={{top:"10px", left:"-175px"}}>
                            <TextInput name="searchString" onChange={props.handleInputChanged} value={props.searchString} style={{background: "white", color: "black"}} icon={<Search color="black"/>} reverse placeholder="search questions..."  /><br/>                        
                            
                        </Box>
                    </Box>
                </Box>

            </Grid>
        </Box>

    )
}


