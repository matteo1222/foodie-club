import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import StepIndicator from '../../components/StepIndicator'
import { foodTypes } from '../../constants/foodTypes'
import './index.css'

function MatchFoodScreen() {
    const [foodPreference, setFoodPreference] = useState([])
    const handleClick = (foodTypeId) => {
        if (foodTypeId === null || foodTypeId === undefined) {
            return
        }

        if (foodPreference.includes(foodTypeId)) {
            setFoodPreference(foodPreference.filter(el => el !== foodTypeId))
        } else {
            setFoodPreference([...foodPreference, foodTypeId])
        }
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
                What kinds of cuisine do you enjoy?
            </Typography>
            <Box sx={{
                width: {sm: '90%', md: '50%'},
                height: 200,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                {foodTypes.map(el => {
                    return (
                        <Chip
                            label={el.label}
                            variant='outlined'
                            onClick={() => {handleClick(el.id)}}
                            className={`chip-selector ${foodPreference.includes(el.id) ? 'chip-selector--active' : ''}`}
                            sx={{
                                marginX: 1
                            }}
                        />
                    )
                })}
            </Box>
            <Box component='div' sx={{marginTop: 10}}>
                <Button
                    variant='contained'
                    component={RouterLink}
                    to='/join-a-group'
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
                    to='/join-a-group'
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
            <StepIndicator steps={3} currentStep={3}/>
        </Container>
    )
}

export default MatchFoodScreen
