import React from 'react'
import { Box, Avatar, Anchor, Grid, Text } from 'grommet';
import QuestionBox from '../components/QuestionBox'
import Question from '../components/Question'

export default function UserHome() {
    return (
        <Grid
            areas={[
                ['blank3','blank3','blank3'],
                ['blank1', 'main', 'blank2'],
                ['blank1', 'question', 'blank2'],
                ['blank1', 'question', 'blank2']
            ]}
            columns={['1/4', 'flex', '1/4']}
            rows={['50px']}
            gap="small"
            responsive="true"
        >
            <Box  gridArea="blank1"/>
            <Box  gridArea="blank2"/>
            <Box  gridArea="blank3" height="500px"/>

            <Box  gridArea="main" height="flex">
                <QuestionBox/>
            </Box>

            <Box gridArea="question" pad="small">
                <Question/>
                <Question/>
                <Question/>
            </Box>

        </Grid>
    )
}
