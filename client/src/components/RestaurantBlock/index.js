import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { COLORS } from '../../constants/colors'
import './index.css'

function RestaurantBlock() {
    const handleStartGroup = () => {
        console.log('join')
    }
    return (
        <Box sx={{
            borderRadius: '20px',
            overflow: 'hidden',
            width: 350,
            boxShadow: `0px 4px 10px 2px ${COLORS.lightGrey}`,
            marginX: 1.2,
            marginY: 1
        }}>
            <Grid container>
                <Grid item xs={5}>
                    <img alt='restaurant image' className='image' src='https://images.squaremeal.co.uk/cloud/restaurants/10712/images/the-ninth-1_09092019021238.jpg?w=928&h=522&fit=crop'/>
                </Grid>
                <Grid item xs={7}>
                    <Grid container alignItems='center' rowSpacing={1} sx={{padding: 2}}>
                        <Grid item xs={10}>
                            <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
                                The Ninth
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body2'>
                                ££
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Chip
                                label='Fast Food'
                                variant='outlined'
                                size='small'
                                sx={{color: COLORS.grey}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={1}>
                                <Typography variant='body2'>
                                    Rated
                                </Typography>
                                <Typography variant='body2' sx={{fontWeight: 'bold', color: COLORS.red}}>
                                    3.9 / 5.0
                                </Typography>
                                <Typography variant='body2'>
                                    on Google
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                variant='contained'
                                color='secondary'
                                aria-label='start-a-group'
                                size='small'
                                onClick={handleStartGroup}
                                sx={{
                                    borderRadius: 20,
                                    color: COLORS.white
                                }}
                            >Start a Group</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default RestaurantBlock
