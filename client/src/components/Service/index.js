import React from 'react';
import { Box, Grid} from 'grommet';



export default function Service() {

    return (
        <Box alignSelf="start" margin={{ "right": "10px" }}>
            <Box
                direction="row"
                align="center"
                background="#F3F3F3"
                round="5px"
                pad={{
                    "left": "15px",
                    "right": "15px",
                    "top": "3px",
                    "bottom": "3px"
                }}
                gridArea="tag"
                elevation="small"
                margin={{
                    "top": "20px",
                    "left": "25px",
                    "right": "25px"
                }}
            >

                <Grid
                    areas={[
                        ['picture', 'title', 'title'],
                    ]}
                    columns={['40px', 'flex', 'flex']}
                    rows={['flex']}
                    responsive="true"
                >
                
                </Grid>
               
            </Box>
        </Box>
    )
}


