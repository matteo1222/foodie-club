import React, { useState } from 'react'
import Header from '../../components/Header'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'
import Link from '@mui/material/Link'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import { COLORS } from '../../constants/colors'
import { useAuth } from '../../components/auth'

function LogInScreen() {
    const navigate = useNavigate()
    const location = useLocation()
    let from = location.state?.from?.pathname || '/'
    const auth = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    // TODO: Add validation
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Submit')
        if (from === '/login') {
            from = '/join-a-group'
        }
        auth.login(
            email,
            password,
            () => navigate(from, { replace: true }),
            (err) => console.log(err)
        )
    }
    return (
        <Grid container sx={{height: '100vh'}}>
            <Grid item xs={12} md={6} sx={{
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
                        Log In
                    </Typography>
                    <Box component='form' onSubmit={handleSubmit} sx={{
                        marginTop: 1
                    }}>
                        <TextField
                            value={email}
                            onChange={handleEmailChange}
                            variant='standard'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            value={password}
                            onChange={handlePasswordChange}
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
                        <Button
                            type='submit'
                            variant='contained'
                            sx={{
                                marginTop: 3,
                                marginBottom: 2,
                                borderRadius: 20,
                                paddingX: 5
                            }}
                        >Log In</Button>
                    </Box>
                    <Typography component='span' sx={{
                        color: COLORS.black
                    }}>
                        Or log in with
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
                <Link component={RouterLink} to='/signup' variant='body2' sx={{
                    marginTop: 5,
                    alignSelf: 'start',
                    justifySelf: 'self-end'
                }}>
                    {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
        </Grid>
    )
}

export default LogInScreen
