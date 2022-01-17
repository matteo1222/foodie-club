import React from 'react'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function LoadMoreButton({onClick}) {
    return (
        <IconButton onClick={onClick}>
            <ExpandMoreIcon/>
        </IconButton>
    )
}

export default LoadMoreButton
