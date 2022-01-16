import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import Slider from '@mui/material/Slider'
import StepIndicator from '../../components/StepIndicator'

function MatchGroupNumScreen() {
    const [groupRange, setGroupRange] = useState([3, 6])
    const groupRangeText = (value) => {
        return `${value} people`
    }
    const handleChange = (event, newValue) => {
        setGroupRange(newValue)
    }
    return (
        <Container sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant='h4' sx={{
                marginTop: 15,
                fontWeight: 'bold',
                color: 'primary.main'
            }}>
                Get Matched
            </Typography>
            <Typography variant='h5' sx={{
                marginY: 5,
                fontStyle: 'italic',
                color: 'secondary.main'
            }}>
                How many people do you want to go with?
            </Typography>
            <Box sx={{ width: '60%', height: 200, display: 'flex', alignItems: 'center' }}>
                <Slider
                    getAriaLabel={() => 'Group number range'}
                    value={groupRange}
                    onChange={handleChange}
                    valueLabelDisplay="on"
                    getAriaValueText={groupRangeText}
                    min={2}
                    max={8}
                />
            </Box>
            <Box component='div' sx={{marginTop: 10}}>
                <Button
                    variant='contained'
                    component={RouterLink}
                    to='/set-up-match-info-food'
                    sx={{
                        marginTop: 3,
                        marginBottom: 2,
                        borderRadius: 20,
                        paddingX: 3,
                        marginX: 3
                    }}
                >Continue</Button>
                <Button
                    variant='contained'
                    component={RouterLink}
                    to='/set-up-match-info-food'
                    sx={{
                        marginTop: 3,
                        marginBottom: 2,
                        borderRadius: 20,
                        paddingX: 3,
                        marginX: 3,
                        opacity: '50%'
                    }}
                >Skip</Button>
            </Box>
            <StepIndicator steps={3} currentStep={2}/>
        </Container>
    )
}

export default MatchGroupNumScreen
