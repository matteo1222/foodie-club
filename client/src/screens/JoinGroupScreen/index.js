import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { theme } from '../../constants/theme'
import GroupBlock from '../../components/GroupBlock'
import SearchBar from '../../components/SearchBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import FilterMenu from '../../components/FilterMenu'

function JoinGroupScreen() {
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box component='main'>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>Join a Group</Typography>
                <Stack direction='row' alignItems='center' sx={{marginRight: 6}}>
                    {matches && <SearchBar id='join-group-search-bar'/>}
                    <IconButton aria-label='join-group-search-button' sx={{display: {sm: 'block', md: 'none'}}}>
                        <SearchIcon/>
                    </IconButton>
                    {/* <IconButton aria-label='join-group-filter-button'>
                        <FilterListIcon/>
                    </IconButton> */}
                    <FilterMenu/>
                </Stack>
            </Stack>
            <Box sx={{padding: 2}}>
                <Typography variant='h5' color='secondary' sx={{fontWeight: 'bold'}}>
                    French
                </Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {new Array(5).fill(null).map((el, idx) => {
                        return (
                            <GroupBlock key={idx}/>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default JoinGroupScreen
