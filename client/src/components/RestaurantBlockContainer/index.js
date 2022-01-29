import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { foodTypesToLabel } from '../../constants/foodTypesToLabel'
import RestaurantBlock from '../RestaurantBlock'
import LoadMoreButton from '../LoadMoreButton'
import client from '../../feathers/feathers-client'

function RestaurantBlockContainer({ foodType, desired, searchText, pricePref }) {
    const QUERY_LIMIT = 6
    const [loading, setLoading] = useState(true)
    const [hasData, setHasData] = useState(true)
    const [restaurants, setRestaurants] = useState([])
    const [total, setTotal] = useState(0)
    const [currentSkip, setCurrentSkip] = useState(0)
    const thisRef = useRef(null)

    const queryRestaurants = (explicitSkip) => {
        console.log('query')
        let queryOption = {
            $skip: explicitSkip === undefined ? currentSkip : explicitSkip,
            $limit: QUERY_LIMIT,
            type: foodType
        }

        if (searchText.length > 0) {
            queryOption.name = {
                $ilike: `%${searchText}%`
            }
        }

        if (pricePref.length > 0) {
            queryOption.price = {
                $in: pricePref
            }
        }
        return client
            .service('restaurants')
            .find({
                query: queryOption
            })
            .then(res => {
                console.log('find res', res)
                if (res.total === 0) setHasData(false)
                setTotal(res.total)
                setCurrentSkip(prevState => prevState + QUERY_LIMIT)
                return res
            })
            .then(res => {
                setLoading(false)
                setRestaurants(prevState => [...prevState, ...res.data])
            })
    }

    useEffect(() => {
        // When foodType changes, reset currentSkip and remove unrelated data
        setLoading(true)
        setHasData(true)
        setCurrentSkip(0)
        setRestaurants([])

        let observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        queryRestaurants(0)
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
    }, [foodType, pricePref, searchText])

    return (
        <Box ref={thisRef} sx={{
            minHeight: 400,
            display: hasData ? 'block' : 'none',
            visibility: loading ? 'hidden' : 'visible'
        }}>
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
                    <LoadMoreButton onClick={() => queryRestaurants()}/>
                </Stack>
            }
        </Box>
    )
}

export default RestaurantBlockContainer
