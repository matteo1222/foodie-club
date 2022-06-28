import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import MyGroupBlock from '../../components/MyGroupBlock'
import { useAuth } from '../../components/auth'
import client from '../../feathers/feathers-client'

function MyGroupsScreen(props) {
    const auth = useAuth()
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null)
    const handleClick = (id) => {
        setSelectedGroup(id)
    }
    
    const queryGroups = () => {
        client
            .service('groups')
            .find({
                query: {
                    isMine: true,
                    user_id: auth.user.id
                }
            })
            .then(res => setGroups(res))
    }

    const onRemoved = (removed) => {
        // use channel instead
        if (removed.user_id !== auth.user.id) {
            return
        }

        setGroups(prevState => prevState.filter(el => el.id !== removed.group_id))
    }
    useEffect(() => {
        queryGroups()

        // set up listener for remove event
        client
            .service('groups')
            .on('removed', onRemoved)
        return (() => {
            client
                .service('groups')
                .removeListener('groups')
        })
    }, [])

    return (
        <Grid container>
            <Grid item sm={12} md={6}>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>My Groups</Typography>
                <Stack direction='column' sx={{paddingY: 2}}>
                    {groups.map((el) => {
                        return (
                            <MyGroupBlock
                                key={el.id}
                                id={el.id}
                                selected={selectedGroup === el.id}
                                group={el}
                                onClick={() => handleClick(el.id)}
                            />
                        )
                    })}
                </Stack>
            </Grid>
            <Grid item sm={12} md={6}>
                {props.children}
            </Grid>
        </Grid>
    )
}

export default MyGroupsScreen
