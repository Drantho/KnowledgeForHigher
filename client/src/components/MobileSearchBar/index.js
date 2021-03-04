import React from 'react';
import { Box, TextInput, Grid,Button } from 'grommet';
import { Search } from 'grommet-icons';
import MediaQuery from 'react-responsive';

export default function MobileSearchBar(props) {

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

                <Box gridArea="search">

                    <Box  align="center" justify="start">
                        <MediaQuery minDeviceWidth={400}>
                        <Box width="200px" gap="medium" style={{ position: "fixed", left:"50%", top: -65}} margin={{top:"68px", left:"-100px"}}>
                            <TextInput name="searchString" onChange={props.handleInputChanged} value={props.searchString} style={{background: "white", color: "black"}} icon={<Search color="black"/>} reverse placeholder="search questions..."  /><br/>                        
                            
                        </Box>
                        </MediaQuery>
                        <MediaQuery maxDeviceWidth={400}>
                        <Box width="150px" style={{ position: "fixed", left:"50%", top: -65}} margin={{top:"68px", left:"-100px"}}>
                            <TextInput name="searchString" onChange={props.handleInputChanged} value={props.searchString} style={{background: "white", color: "black"}} icon={<Search color="black"/>} reverse placeholder="search questions..."  /><br/>                        
                            
                        </Box>
                        </MediaQuery>
                        {/* <Box>
                        <Box width="100px" gap="medium" style={{ position: "fixed", left:"50%", top: 40}} margin={{top:"70px", left:"-150px"}}>
                            <Button style={{background:"red"}} size="small" label="Questions"/>                    
                          
                        </Box>
                        <Box width="100px" gap="medium" style={{ position: "fixed", left:"50%", top: 40}} margin={{top:"70px", left:"50px"}}>                  
                            <Button style={{background:"blue"}}  size="small" label="Answers"/>      
                        </Box>
                        </Box> */}
                    </Box>
                </Box>

            </Grid>
        </Box>

    )
}
