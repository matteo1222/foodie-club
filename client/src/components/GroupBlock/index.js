import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import { COLORS } from '../../constants/colors'
import dayjs from 'dayjs'
import { useAuth } from '../auth'
import client from '../../feathers/feathers-client'
import './index.css'

function GroupBlock({ group }) {
    const auth = useAuth()
    const [showSnackbar, setShowSnackbar] = useState(false)

    const handleGroupJoin = () => {
        client
            .service('groups')
            .create({
                user_id: auth.user.id,
                group_id: group.id
            }, {
                query: {
                    join: true
                }
            })
            .then(() => {
                setShowSnackbar(true)
            })
            .catch(err => console.error('Error joining group: ', err))
    }

    const handleClose = () => {
        setShowSnackbar(false)
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
                    <img alt='restaurant' className='image' src={group.image_source}/>
                </Grid>
                <Grid item xs={7}>
                    <Grid container alignItems='center' rowSpacing={1} sx={{padding: 2}}>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>
                                {group.restaurant}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body2'>
                                {group.price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Chip
                                label={dayjs(group.datetime).format('MMM. D, YYYY H:mm')}
                                variant='outlined'
                                color='secondary'
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={1}>
                                <Typography variant='body2' sx={{fontWeight: 'bold'}}>
                                    {`${group.users.length} ${group.users.length > 1 ? 'people' : 'person'}`}
                                </Typography>
                                <Typography variant='body2'>
                                    already joined
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                            <Button
                                variant='contained'
                                color='secondary'
                                aria-label='join'
                                onClick={handleGroupJoin}
                                sx={{
                                    borderRadius: 20,
                                    color: COLORS.white
                                }}
                            >Join</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                message='Group joined'
            />
        </Box>
    )
}

export default GroupBlock
