import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import { COLORS } from '../../constants/colors'
import './index.css'

function ProfileScreen() {
    const [imgSrc, setImgSrc] = useState(null)
    const [email, setEmail] = useState('johndoe@gmail.com')
    const [aboutMe, setAboutMe] = useState('')
    const handlePhotoClick = () => {
        console.log('click')
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleAboutMeChange = (event) => {
        setAboutMe(event.target.value)
    }

    return (
        <Grid container justifyContent='center'>
            <Grid item sm={12} sx={{marginBottom: 2}}>
                <Typography variant='h4' sx={{fontWeight: 'bold'}}>Profile</Typography>
            </Grid>
            <Grid item sm={10} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box onClick={handlePhotoClick} className='photo-button' sx={{
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    border: `2px solid ${COLORS.grey}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        imgSrc ?
                        <img alt="user's photo" src={imgSrc}/>
                        :
                        <AddIcon sx={{fontSize: 40}}/>
                    }
                </Box>
                <Typography variant='h5' sx={{fontWeight: 'bold', marginY: 2}}>John Doe</Typography>
                <TextField
                    label='Email Address'
                    name='email'
                    helperText="Others won't be able to see your email."
                    value={email}
                    onChange={handleEmailChange}
                    variant='standard'
                    fullWidth
                    margin='normal'
                    id='email'
                    autoComplete='email'
                />
                <TextField
                    label='About me'
                    name='about-me'
                    value={aboutMe}
                    onChange={handleAboutMeChange}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    id='about-me'
                    multiline
                    minRows={8}
                    placeholder='Briefly introduce yourself to let people know more about you. This make it easier for you to find a foodie friend!'
                />
            </Grid>
        </Grid>
    )
}

export default ProfileScreen
