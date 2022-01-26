import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import { COLORS } from '../../constants/colors'
import { Link as RouterLink } from 'react-router-dom'
import dayjs from 'dayjs'
import './index.css'

function MyGroupBlock({id, selected, onClick, group}) {
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
                                    {`${group.users.length} ${group.users.length > 1 ? 'people' : 'person'}`}
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
