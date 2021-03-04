import React from 'react';
import { Box, Grid, Text} from 'grommet';


export default function AddQuestion() {

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
                    ['blank', 'question', 'blank1'],
                ]}
                columns={['1/4', '2/4', '1/4']}
                rows={['45px']}
                gap="15px"
                responsive="true"
            >
                <Box gridArea="question" width="500px">
                    <Text size="30px" color="#FCE181">Add a Question!</Text>
                </Box>
            </Grid>
        </Box>

    )
}