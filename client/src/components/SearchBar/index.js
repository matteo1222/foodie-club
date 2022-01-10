import React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search'
import { COLORS } from '../../constants/colors'

function SearchBar({ id, sx }) {
    return (
        <TextField
            id={id}
            placeholder='Search'
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start'>
                        <SearchIcon />
                    </InputAdornment>
                ),
                sx: sx ? sx : {}
            }}
            variant='standard'
        />
    )
}

export default SearchBar
