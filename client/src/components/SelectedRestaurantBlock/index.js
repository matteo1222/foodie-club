import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { COLORS } from '../../constants/colors'

function SelectedRestaurantBlock({ restaurantName, imgSrc, close, itemId }) {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 210,
            height:140,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${imgSrc}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: 5,
            padding: 3,
            position: 'relative',
            marginX: 1,
            marginY: 1
        }}>
            <IconButton onClick={close} size='small' sx={{
                position: 'absolute',
                right: 5,
                top: 5,
                color: COLORS.white
            }}>
                <CloseIcon/>
            </IconButton>
            <Typography variant='body1' sx={{fontWeight: 'bold', color: COLORS.white, width: '70%', textAlign: 'center'}}>{restaurantName}</Typography>
        </Box>
    )
}

export default SelectedRestaurantBlock
