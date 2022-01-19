import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { theme } from '../../constants/theme'
import MyGroupBlock from '../../components/MyGroupBlock'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../components/auth'
import client from '../../feathers/feathers-client'

function MyGroupsScreen(props) {
    const auth = useAuth()
    const [groups, setGroups] = useState([])
    const [selectedGroup, setSelectedGroup] = useState(null)
    const navigate = useNavigate()
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
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
            .then(res => {
                console.log('group res', res)
                return res
            })
            .then(res => setGroups(res))
    }
    useEffect(() => {
        queryGroups()
    }, [])
    useEffect(() => {
        if (groups.length > 0) {
            setSelectedGroup(0)
            navigate('/my-groups/0')
        }
    }, [groups])

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
