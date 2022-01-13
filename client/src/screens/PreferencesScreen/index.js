import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import Chip from '@mui/material/Chip'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton'
import { COLORS } from '../../constants/colors'
import StepIndicator from '../../components/StepIndicator'
import WeekdayTimeTable from '../../components/WeekdayTimeTable'
import { foodTypes } from '../../constants/foodTypes'
import './index.css'

function PreferencesScreen() {
    const [currentStep, setCurrentStep] = useState(1)
    const [groupRange, setGroupRange] = useState([3, 6])
    const [foodPreference, setFoodPreference] = useState([])

    const groupRangeText = (value) => {
        return `${value} people`
    }

    const handleNavigateBefore = () => {
        setCurrentStep(prevStep => Math.max(1, prevStep - 1))
    }

    const handleNavigateNext = () => {
        setCurrentStep(prevStep => Math.min(3, prevStep + 1))
    }

    const handleGroupNumChange = (event, newValue) => {
        setGroupRange(newValue)
    }

    const handleFoodClick = (foodTypeId) => {
        if (foodTypeId === null || foodTypeId === undefined) {
            return
        }

        if (foodPreference.includes(foodTypeId)) {
            setFoodPreference(foodPreference.filter(el => el !== foodTypeId))
        } else {
            setFoodPreference([...foodPreference, foodTypeId])
        }
    }

    const matchTimeTab = (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant='h5' sx={{
                marginY: 5,
                fontStyle: 'italic',
                color: 'secondary.main'
            }}>
                When are you usually available?
            </Typography>
            <Box sx={{width: '80%', height: 200}}>
                <WeekdayTimeTable/>
            </Box>
        </Container>
    )

    const matchGroupNumTab = (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
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
                    onChange={handleGroupNumChange}
                    valueLabelDisplay="on"
                    getAriaValueText={groupRangeText}
                    min={2}
                    max={8}
                />
            </Box>
        </Container>
    )

    const matchFoodTab = (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
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
                            onClick={() => {handleFoodClick(el.id)}}
                            className={`chip-selector ${foodPreference.includes(el.id) ? 'chip-selector--active' : ''}`}
                            sx={{
                                marginX: 1
                            }}
                        />
                    )
                })}
            </Box>
        </Container>
    )

    return (
        <Grid container justifyContent='center'>
            <Grid item sm={12} sx={{marginBottom: 3}}>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>Preferences</Typography>
            </Grid>
            <Grid item sm={1} sx={{display: 'flex', alignItems: 'center'}}>
                {
                    currentStep > 1 &&
                    <IconButton onClick={handleNavigateBefore}>
                        <NavigateBeforeIcon sx={{fontSize: 50}}/>
                    </IconButton>
                }
            </Grid>
            <Grid item sm={10}>
                {currentStep === 1 && matchTimeTab}
                {currentStep === 2 && matchGroupNumTab}
                {currentStep === 3 && matchFoodTab}
            </Grid>
            <Grid item sm={1}  sx={{display: 'flex', alignItems: 'center'}}>
                {
                    currentStep < 3 &&
                    <IconButton onClick={handleNavigateNext}>
                        <NavigateNextIcon sx={{fontSize: 50}}/>
                    </IconButton>
                }
            </Grid>
            <Grid item sm={12} sx={{display: 'flex', justifyContent: 'center'}}>
                <StepIndicator steps={3} currentStep={currentStep}/>
            </Grid>
        </Grid>
    )
}

export default PreferencesScreen
