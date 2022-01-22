import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function NotFoundScreen() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Typography variant='h2' sx={{fontWeight: 'bold'}}>Page Not Found.</Typography>
        </Box>
    )
}

export default NotFoundScreen
