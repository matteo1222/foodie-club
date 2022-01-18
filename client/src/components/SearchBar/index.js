import React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search'

function SearchBar({ id, sx, value, onChange }) {
    return (
        <TextField
            value={value}
            onChange={onChange}
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
