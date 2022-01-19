import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { theme } from '../../constants/theme'
import GroupBlock from '../../components/GroupBlock'
import SearchBar from '../../components/SearchBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import FilterMenuGroup from '../../components/FilterMenuGroup'
import { useAuth } from '../../components/auth'
import client from '../../feathers/feathers-client'

function JoinGroupScreen() {
    const auth = useAuth()
    const [groups, setGroups] = useState([])
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const queryGroups = () => {
        client
            .service('groups')
            .find({
                query: {
                    isMine: false,
                    user_id: auth.user.id
                }
            })
            .then(res => {
                console.log('group res', res)
                return res
            })
            .then(res => setGroups(res))
    }
    useEffect(() => {
        queryGroups()
    }, [])
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
                    <FilterMenuGroup/>
                </Stack>
            </Stack>
            <Box sx={{padding: 2}}>
                <Typography variant='h5' color='secondary' sx={{fontWeight: 'bold'}}>
                    French
                </Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {groups.map((el) => {
                        return (
                            <GroupBlock
                                group={el}
                                key={el.id}
                            />
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default JoinGroupScreen
