import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { foodTypesToLabel } from '../../constants/foodTypesToLabel'
import LoadMoreButton from '../LoadMoreButton'
import GroupBlock from '../GroupBlock'
import { useAuth } from '../auth'
import client from '../../feathers/feathers-client'

function GroupBlockContainer({ foodType, desired, searchText, timePref, pricePref, groupRange }) {
    const auth = useAuth()
    const QUERY_LIMIT = 6
    const [loading, setLoading] = useState(true)
    const [hasData, setHasData] = useState(true)
    const [groups, setGroups] = useState([])
    const [total, setTotal] = useState(0)
    const [currentSkip, setCurrentSkip] = useState(0)
    const thisRef = useRef(null)

    const queryGroups = (explicitSkip) => {
        let queryOption = {
            isMine: false,
            user_id: auth.user.id,
            $skip: explicitSkip === undefined ? currentSkip : explicitSkip,
            $limit: QUERY_LIMIT,
            type: foodType,
            groupRange: groupRange
        }

        if (searchText.length > 0) {
            queryOption.name = {
                $ilike: `%${searchText}%`
            }
        }

        if (pricePref.length > 0) {
            queryOption.price = pricePref
        }

        return client
            .service('groups')
            .find({
                query: queryOption
            })
            .then(res => {
                console.log('find res', res)
                if (res.length === 0) setHasData(false)
                setTotal(res.total)
                setCurrentSkip(prevState => prevState + QUERY_LIMIT)
                return res
            })
            .then(res => {
                setLoading(false)
                setGroups(prevState => [...prevState, ...res])
            })
    }

    useEffect(() => {
        // When foodType changes, reset currentSkip and remove unrelated data
        setLoading(true)
        setHasData(true)
        setCurrentSkip(0)
        setGroups([])

        let observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        queryGroups(0)
                        observer = observer.disconnect()
                    }
                })
            },
            { rootMargin: '0px 0px 100px 0px' }
        )
        observer.observe(thisRef.current)
        return () => (observer = observer && observer.disconnect())
    }, [foodType, pricePref, searchText, groupRange])

    return (
        // TODO: Fix the layout shifting bug
        <Box ref={thisRef} sx={{
            minHeight: 400,
            display: hasData ? 'block' : 'none',
            visibility: loading ? 'hidden' : 'visible'
        }}>
            <Typography variant='h5' color='secondary' sx={{fontWeight: 'bold'}}>
                {foodTypesToLabel[foodType]}
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
            {
                currentSkip < total &&
                <Stack direction='row' justifyContent='center'>
                    <LoadMoreButton onClick={() => queryGroups()}/>
                </Stack>
            }
        </Box>
    )
}

export default GroupBlockContainer
