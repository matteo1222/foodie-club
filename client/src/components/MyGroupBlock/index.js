import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import { COLORS } from '../../constants/colors'
import { Link as RouterLink } from 'react-router-dom'
import './index.css'

function MyGroupBlock({id, selected, onClick}) {
    const handleGroupJoin = () => {
        console.log('join')
    }
    return (
        <Box
            component={RouterLink}
            to={`/my-groups/${id}`}
            onClick={onClick}
            className='my-group-block'
            sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                width: 350,
                boxShadow: `0px 4px 10px 2px ${COLORS.lightGrey}`,
                marginX: 1.2,
                marginY: 1,
                textDecoration: 'none',
                color: selected ? COLORS.white : 'inherit',
                background: selected ? COLORS.red : 'inherit'
            }}
        >
            <Grid container>
                <Grid item xs={5}>
                    <img alt='restaurant' className='image' src='https://images.squaremeal.co.uk/cloud/restaurants/10712/images/the-ninth-1_09092019021238.jpg?w=928&h=522&fit=crop'/>
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
                                label='Jan. 8, 2022 Daytime'
                                variant='outlined'
                                size='small'
                                sx={{
                                    color: selected ? COLORS.white : COLORS.red,
                                    borderColor: selected ? COLORS.white : COLORS.red
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={1}>
                                <Typography variant='body2' sx={{fontWeight: 'bold'}}>
                                    4 people
                                </Typography>
                                <Typography variant='body2'>
                                    already joined
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MyGroupBlock
