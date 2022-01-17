import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { COLORS } from '../../constants/colors'
import './index.css'
import { foodTypesToLabel } from '../../constants/foodTypesToLabel'
import { useAuth } from '../auth'
import client from '../../feathers/feathers-client'

function RestaurantBlock ({ restaurant, disabled }) {
    const auth = useAuth()
    console.log('restua', restaurant)
    const handleStartGroup = () => {
        console.log('join')
        client
            .service('desired-restaurant')
            .create({
                user_id: auth.user.id,
                restaurant_id: restaurant.id
            }, {
                query: {
                    getRestaurants: true
                }
            })
            .catch(err => console.error('Error creating desired restaurants', err))
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
                    <img alt='restaurant' className='image' src={restaurant.image_source}/>
                </Grid>
                <Grid item xs={7}>
                    <Grid container alignItems='center' rowSpacing={1} sx={{padding: 2}}>
                        <Grid item xs={10}>
                            <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
                                {restaurant.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant='body2' sx={{whiteSpace: 'nowrap'}}>
                                {restaurant.price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Chip
                                label={foodTypesToLabel[restaurant.type]}
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
                                    {`${restaurant.rating} / 5.0`}
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
                                disabled={disabled}
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
