import React, { Component } from 'react';
import { Box, TextInput, Form, FormField, Button,Grid } from 'grommet';
import './style.css';
import WithTags from '../TagSearch/index'

export default function QuestionBox() {

    return (
        <Box
            justify="center"
            align="center"
            pad="5px"
            background="#2B3952"
            round="5px"
            height="60px"
        >
           
                <Grid
                    areas={[
                        ['add', 'search',  'filter'],
                    ]}
                    columns={['1/4', 'flex',  '1/4']}
                    rows={['45px']}
                    gap="15px"
                    responsive="true"
                >
                    <Box gridArea="add" pad="small" >
                        <Button  id="addButton" color="#FCE181"> Question </Button>
                    </Box>

                    <Box gridArea="search">
                        {/* <Form> */}
                            {/* <FormField name="name" htmlFor="textinput-id" label="" >
                                <TextInput id="textinput-id" name="name" />
                            </FormField> */}
                        {/* </Form> */}
                        <WithTags/>
                    </Box>

                    <Box gridArea="filter" pad="small">
                    <Button  id="filterButton" color="#FCE181"> Filter </Button>
                    </Box>
                </Grid>
            </Box>

    )
}


