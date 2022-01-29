import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import RestaurantBlock from '../RestaurantBlock'
import client from '../../feathers/feathers-client'

function RecommendedRestaurantBlockContainer({ desired }) {
    // const QUERY_LIMIT = 6
    const [loading, setLoading] = useState(true)
    // const [hasData, setHasData] = useState(true)
    const [restaurants, setRestaurants] = useState([])
    // const [total, setTotal] = useState(0)
    // const [currentSkip, setCurrentSkip] = useState(0)
    const thisRef = useRef(null)

    const queryRestaurants = (explicitSkip) => {
        console.log('query')
        let queryOption = {
            mode: 'popular'
        }

        if (desired.length > 1) {
            queryOption = {
                mode: 'similar',
                id: desired.slice(-1)[0].restaurant_id
            }
        }

        return client
            .service('restaurants')
            .find({
                query: queryOption
            })
            .then(res => {
                console.log('find res', res)
                return res
            })
            .then(res => {
                setLoading(false)
                setRestaurants(res)
            })
    }

    useEffect(() => {
        // When foodType changes, reset currentSkip and remove unrelated data
        setLoading(true)

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
    }, [desired])

    return (
        <Box ref={thisRef} sx={{
            minHeight: 400,
            visibility: loading ? 'hidden' : 'visible'
        }}>
            <Typography variant='h5' color='secondary' sx={{fontWeight: 'bold'}}>
                Restaurants you might like
            </Typography>
            <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
                {restaurants.map((restaurant) => {
                    return (
                        <RestaurantBlock restaurant={restaurant} key={restaurant.id} disabled={desired.some(el => el.restaurant_id === restaurant.id)}/>
                    )
                })}
            </Box>
        </Box>
    )
}

export default RecommendedRestaurantBlockContainer
