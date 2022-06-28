import React, { useState } from 'react'
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
import DateTimePickerModal from '../DateTimePickerModal'

function RestaurantBlock ({ restaurant, disabled }) {
    const auth = useAuth()
    const [open, setOpen] = useState(false)
    const [dateTime, setDateTime] = useState(new Date())
    const handleOpenModal = () => {
        setOpen(true)
    }
    const handleCloseModal = () => {
        setOpen(false)
    }
    const handleDateTimeChange = (newValue) => {
        setDateTime(newValue)
    }
    const handleStartGroup = () => {
        setOpen(false)
        // Add desired restaurant
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
            .catch(err => console.error('Error creating desired restaurant', err))
        
        // Create a group
        client
            .service('groups')
            .create({
                user_id: auth.user.id,
                restaurant_id: restaurant.id,
                datetime: dateTime.toISOString()
            })
            .catch(err => console.error('Error creating group', err))
    }
    return (
        <Box sx={{
            borderRadius: '20px',
            overflow: 'hidden',
            width: 350,
            boxShadow: `0px 4px 10px 2px ${COLORS.lightGrey}`,
            marginX: 1.2,
            marginY: 1,
            display: 'grid'
        }}>
            <Grid container>
                <Grid item xs={5}>
                    <img alt='restaurant' className='image' src={restaurant.image_source}/>
                </Grid>
                <Grid item xs={7}>
                    <Grid container alignItems='center' rowSpacing={1} sx={{padding: 2}}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
                                {restaurant.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
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
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                variant='contained'
                                color='secondary'
                                aria-label='start-a-group'
                                size='small'
                                disabled={disabled}
                                onClick={handleOpenModal}
                                sx={{
                                    borderRadius: 20,
                                    color: COLORS.white
                                }}
                            >Start a Group</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <DateTimePickerModal
                dateTime={dateTime}
                handleDateTimeChange={handleDateTimeChange}
                open={open}
                handleClose={handleCloseModal}
                handleSubmit={handleStartGroup}
            />
        </Box>
    )
}

export default RestaurantBlock
