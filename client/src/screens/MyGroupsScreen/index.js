import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { theme } from '../../constants/theme'
import MyGroupBlock from '../../components/MyGroupBlock'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useNavigate } from 'react-router-dom'

function MyGroupsScreen(props) {
    const [groups, setGroups] = useState([0])
    const [selectedGroup, setSelectedGroup] = useState(null)
    const navigate = useNavigate()
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const handleClick = (id) => {
        setSelectedGroup(id)
    }

    useEffect(() => {
        if (groups.length > 0) {
            setSelectedGroup(0)
            navigate('/my-groups/0')
        }
    }, [])

    return (
        <Grid container>
            <Grid item sm={12} md={6}>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>My Groups</Typography>
                <Stack direction='column' sx={{paddingY: 2}}>
                    {new Array(5).fill(null).map((el, idx) => {
                        return (
                            <MyGroupBlock
                                key={idx}
                                id={idx}
                                selected={selectedGroup === idx}
                                onClick={() => handleClick(idx)}
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
