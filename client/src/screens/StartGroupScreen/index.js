import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { theme } from '../../constants/theme'
import SearchBar from '../../components/SearchBar'
import useMediaQuery from '@mui/material/useMediaQuery'
import FilterMenuRestaurant from '../../components/FilterMenuRestaurant'
import SelectedRestaurantBlock from '../../components/SelectedRestaurantBlock'
import { selectedRestaurants as restaurantData } from '../../mockData/selectedRestaurants'
import RestaurantBlock from '../../components/RestaurantBlock'
import client from '../../feathers/feathers-client'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import { useAuth } from '../../components/auth'
import LeftArrow from '../../components/LeftArrow'
import RightArrow from '../../components/RightArrow'
import RestaurantBlockContainer from '../../components/RestaurantBlockContainer'
import { foodTypes } from '../../constants/foodTypes'

function StartGroupScreen() {
    const auth = useAuth()
    const [searchText, setSearchText] = useState('')
    const [pricePref, setPricePref] = useState([])
    const [foodPref, setFoodPref] = useState([])
    const [desired, setDesired] = useState([])
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const queryDesired = () => {
        return client
            .service('desired-restaurant')
            .find({
                query: {
                    user_id: 1,
                    getRestaurants: true
                }
            })
            .then(res => setDesired(res))
    }

    const onCreated = (created) => {
        console.log('created', created)
        if (created.user_id !== auth.user.id) return

        setDesired(prevState => [...prevState, {
            id: created.id,
            user_id: created.user_id,
            restaurant_id: created.restaurant_id,
            name: created.data.name,
            image_source: created.data.image_source
        }])
    }

    const onRemoved = (removed) => {
        console.log('removed', removed)
        if (removed.user_id !== auth.user.id) return

        setDesired(prevState => prevState.filter(el => el.id !== removed.id))
    }

    const handleSearchChange = (event) => {
        setSearchText(event.target.value)
    }

    const removeDesiredRestaurant = (desired) => {
        client
            .service('desired-restaurant')
            .remove(desired.id)
    }

    const getFoodTypeContainer = () => {
        if (foodPref.length === 0) {
            return foodTypes.map(el => {
                return (
                    <RestaurantBlockContainer
                        key={el.id}
                        foodType={el.value}
                        desired={desired}
                        searchText={searchText}
                        pricePref={pricePref}
                    />
                )
            })
        }
        
        return foodPref.map(el => {
            return (
                <RestaurantBlockContainer
                    key={el.id}
                    foodType={el}
                    desired={desired}
                    searchText={searchText}
                    pricePref={pricePref}
                />
            )
        })
    }

    useEffect(() => {
        // query desired restaurants
        queryDesired()
        // set up listener for create/remove event
        client
            .service('desired-restaurant')
            .on('created', onCreated)
        client
            .service('desired-restaurant')
            .on('removed', onRemoved)
        return (() => {
            client
                .service('desired-restaurant')
                .removeListener('created')
            client
                .service('desired-restaurant')
                .removeListener('removed')
        })
    }, [])
    return (
        <Box component='main'>
            <Typography variant='h4' sx={{fontWeight: 'bold'}}>
                {desired.length === 0 ? 'Select a Restaurant to Start a Group' : 'Great! Waiting for others to join...'}
            </Typography>
            <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                {desired.map((el) => {
                    return (
                        <SelectedRestaurantBlock
                            restaurantName={el.name}
                            imgSrc={el.image_source}
                            close={() => removeDesiredRestaurant(el)}
                            key={el.id}
                            itemId={el.id}
                        />
                    )
                })}

            </ScrollMenu>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{marginTop: 2}}>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>Start a Group</Typography>
                <Stack direction='row' alignItems='center' sx={{marginRight: 6}}>
                    {matches && <SearchBar id='join-group-search-bar' value={searchText} onChange={handleSearchChange}/>}
                    <IconButton aria-label='join-group-search-button' sx={{display: {sm: 'block', md: 'none'}}}>
                        <SearchIcon/>
                    </IconButton>
                    {/* <IconButton aria-label='join-group-filter-button'>
                        <FilterListIcon/>
                    </IconButton> */}
                    <FilterMenuRestaurant
                        pricePref={pricePref}
                        setPricePref={setPricePref}
                        foodPref={foodPref}
                        setFoodPref={setFoodPref}
                    />
                </Stack>
            </Stack>
            <Box sx={{padding: 2}}>
                {getFoodTypeContainer()}
                <Typography variant='h5' color='secondary' sx={{fontWeight: 'bold', marginTop: 2}}>
                    Restaurants you might like
                </Typography>
                <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                    {new Array(3).fill(null).map((el, idx) => {
                        return (
                            <RestaurantBlock
                                restaurant={{name: 'HI', type: 'pizza', price: 'OO', image_source: '', rating: 4.5}}
                                key={idx}
                            />
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default StartGroupScreen
