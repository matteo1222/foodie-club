import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../constants/theme'
import WeekdayTimeTable from '../../components/WeekdayTimeTable'
import StepIndicator from '../../components/StepIndicator'

function MatchTimeScreen() {
    return (
        <ThemeProvider theme={theme}>
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
                    When are you usually available?
                </Typography>
                <WeekdayTimeTable/>
                <Box component='div' sx={{marginTop: 10}}>
                    <Button
                        variant='contained'
                        component={RouterLink}
                        to='/set-up-match-info-group-num'
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
                        to='/set-up-match-info-group-num'
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
                <StepIndicator steps={3} currentStep={1}/>
            </Container>
        </ThemeProvider>
    )
}

export default MatchTimeScreen
