import React from 'react'
import Header from '../../components/Header'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../constants/theme'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import { COLORS } from '../../constants/colors'

function SignUpScreen() {
    const handleSubmit = () => {
        console.log('Submit')
    }
    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{height: '100vh'}}>
                <Grid item md={6} sx={{
                    display: {xs: 'none', sm: 'none', md: 'block'}
                }}>
                    <Header/>
                </Grid>
                <Grid item xs={12} md={6} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingX: 10
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '75%'
                    }}>
                        <Typography component='h1' variant='h5'>
                            Sign Up
                        </Typography>
                        <Box component='form' onSubmit={handleSubmit} sx={{
                            marginTop: 1
                        }}>
                            <TextField
                                variant='standard'
                                margin='normal'
                                required
                                fullWidth
                                id='name'
                                label='Name'
                                name='name'
                                autoComplete='name'
                                autoFocus
                            />
                            <TextField
                                variant='standard'
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                            />
                            <TextField
                                variant='standard'
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                            />
                            <TextField
                                variant='standard'
                                margin='normal'
                                required
                                fullWidth
                                name='confirm-password'
                                label='Confirm Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                            />
                        </Box>
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{
                                marginTop: 3,
                                marginBottom: 2,
                                borderRadius: 20,
                                paddingX: 5
                            }}
                        >Sign Up</Button>
                        <Typography component='span' sx={{
                            color: COLORS.black
                        }}>
                            Or sign up with
                        </Typography>
                        <Box component='div'>
                            <IconButton aria-label='facebook-signup'>
                                <FacebookIcon/>
                            </IconButton>
                            <IconButton aria-label='google-signup'>
                                <GoogleIcon/>
                            </IconButton>
                        </Box>
                    </Box>
                    <Link href='#' variant='body2' sx={{
                        marginTop: 5,
                        alignSelf: 'start'
                    }}>
                        {'Already have an account? Sign In'}
                    </Link>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}

export default SignUpScreen
