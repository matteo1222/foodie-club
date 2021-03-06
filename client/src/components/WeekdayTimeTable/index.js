import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Checkbox from '../Checkbox'

function WeekdayTimeTable() {
    return (
        <Container>
            {/* First Row */}
            <Grid container justifyContent='center' sx={{marginY: 2}}>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant='h6'>Mon.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant='h6'>Tues.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant='h6'>Wed.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant='h6'>Thur.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant='h6'>Fri.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant='h6'>Sat.</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant='h6'>Sun.</Typography>
                </Grid>
            </Grid>
            {/* Second Row */}
            <Grid container justifyContent='center' sx={{marginY: 2}}>
                <Grid item xs={2}>
                    <Typography variant='h6'>Daytime</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
            </Grid>
            {/* Third Row */}
            <Grid container justifyContent='center' sx={{marginY: 2}}>
                <Grid item xs={2}>
                    <Typography variant='h6'>Night-time</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
                <Grid item xs={1}>
                    <Checkbox/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default WeekdayTimeTable
