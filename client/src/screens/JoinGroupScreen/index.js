import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { theme } from '../../constants/theme'
import SearchBar from '../../components/SearchBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import FilterMenuGroup from '../../components/FilterMenuGroup'
import GroupBlockContainer from '../../components/GroupBlockContainer'
import UpcomingGroupBlockContainer from '../../components/UpComingGroupBlockContainer'
import PopularGroupBlockContainer from '../../components/PopularGroupBlockContainer'
import { foodTypes } from '../../constants/foodTypes'

function JoinGroupScreen() {
    // TODO: create a state with joined groups
    // TODO: update aria-label
    const [joined, setJoined] = useState([])
    const [foodPref, setFoodPref] = useState([])
    const [pricePref, setPricePref] = useState([])
    const [groupRange, setGroupRange] = useState([2, 8])
    const [searchText, setSearchText] = useState('')
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const handleSearchChange = (event) => {
        setSearchText(event.target.value)
    }
    const getFoodTypeContainer = () => {
        if (foodPref.length === 0) {
            return foodTypes.map((el, idx) => {
                return (
                    <GroupBlockContainer
                        key={idx}
                        foodType={el.value}
                        joined={joined}
                        searchText={searchText}
                        groupRange={groupRange}
                        pricePref={pricePref}
                    />
                )
            })
        }
        
        return foodPref.map((el, idx) => {
            return (
                <GroupBlockContainer
                    key={idx}
                    foodType={el}
                    joined={joined}
                    searchText={searchText}
                    groupRange={groupRange}
                    pricePref={pricePref}
                />
            )
        })
    }

    return (
        <Box component='main'>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>Join a Group</Typography>
                <Stack direction='row' alignItems='center' sx={{marginRight: 6}}>
                    {matches && <SearchBar value={searchText} onChange={handleSearchChange} id='join-group-search-bar'/>}
                    <IconButton aria-label='join-group-search-button' sx={{display: {sm: 'block', md: 'none'}}}>
                        <SearchIcon/>
                    </IconButton>
                    {/* TODO: Refactor */}
                    <FilterMenuGroup
                        foodPref={foodPref}
                        setFoodPref={setFoodPref}
                        pricePref={pricePref}
                        setPricePref={setPricePref}
                        groupRange={groupRange}
                        setGroupRange={setGroupRange}
                    />
                </Stack>
            </Stack>
            <Box sx={{ padding: 2 }}>
                <UpcomingGroupBlockContainer />
                <PopularGroupBlockContainer />
                {getFoodTypeContainer()}
            </Box>
        </Box>
    )
}

export default JoinGroupScreen
