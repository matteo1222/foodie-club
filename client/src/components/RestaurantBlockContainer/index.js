import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { foodTypesToLabel } from '../../constants/foodTypesToLabel'
import RestaurantBlock from '../RestaurantBlock'
import LoadMoreButton from '../LoadMoreButton'
import client from '../../feathers/feathers-client'

function RestaurantBlockContainer({ foodType, desired }) {
    const QUERY_LIMIT = 6
    const [restaurants, setRestaurants] = useState([])
    const [total, setTotal] = useState(0)
    const [currentSkip, setCurrentSkip] = useState(0)
    const thisRef = useRef(null)

    const queryRestaurants = (foodType) => {
        console.log('query')
        return client
            .service('restaurants')
            .find({
                query: {
                    $skip: currentSkip,
                    $limit: QUERY_LIMIT,
                    type: foodType
                }
            })
            .then(res => {
                console.log('find res', res)
                setTotal(res.total)
                setCurrentSkip(prevState => prevState + QUERY_LIMIT)
                return res
            })
            .then(res => setRestaurants(prevState => [...prevState, ...res.data]))
    }

    useEffect(() => {
        let observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        queryRestaurants(foodType)
                        observer = observer.disconnect()
                    }
                })
            },
            { rootMargin: '0px 0px 100px 0px' }
        )
        observer.observe(thisRef.current)
        // query restuarants
        // queryRestaurants(foodType)
        return () => (observer = observer && observer.disconnect())
    }, [foodType])
    return (
        <Box ref={thisRef} sx={{minHeight: 400}}>
            <Typography variant='h5' color='secondary' sx={{fontWeight: 'bold'}}>
                {foodTypesToLabel[foodType]}
            </Typography>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {restaurants.map((restaurant) => {
                    return (
                        <RestaurantBlock restaurant={restaurant} key={restaurant.id} disabled={desired.some(el => el.restaurant_id === restaurant.id)}/>
                    )
                })}
            </Box>
            {
                currentSkip < total &&
                <Stack direction='row' justifyContent='center'>
                    <LoadMoreButton onClick={() => queryRestaurants(foodType)}/>
                </Stack>
            }
        </Box>
    )
}

export default RestaurantBlockContainer
