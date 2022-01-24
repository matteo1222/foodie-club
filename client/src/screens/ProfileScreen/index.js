import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import AddIcon from '@mui/icons-material/Add'
import { COLORS } from '../../constants/colors'
import { useAuth } from '../../components/auth'
import client from '../../feathers/feathers-client'
import './index.css'

function ProfileScreen() {
    const auth = useAuth()
    let params = useParams()
    const navigate = useNavigate()
    const paramsUserId = Number(params.userId)
    const [imgSrc, setImgSrc] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [aboutMe, setAboutMe] = useState('')
    const [showSnackbar, setShowSnackbar] = useState(false)

    const queryAvatar = () => {
        // TODO: Add image resize, validation in either client or server or both
        // TODO: change user model to include upload_id, so we dont have to keep querying if users dont have photo
        client
            .service('uploads')
            .get(paramsUserId)
            .then(res => {
                if (res.path) {
                    console.log('res.path', res.path)
                    // remove public/
                    const imgURL = `http://localhost:3030/${res.path}`
                    setImgSrc(imgURL)
                } else if (paramsUserId !== auth.user.id) {
                    // TODO: change this
                    setImgSrc('https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png')
                }
            })
            .catch(err => {
                if (err.code !== 404) {
                    console.error('Error fetching user avatar', err)
                }
                setImgSrc('https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png')
            })
    }

    const queryUser = () => {
        client
            .service('users')
            .get(paramsUserId)
            .then(res => {
                setUsername(res.name)
                if (res.about_me) {
                    setAboutMe(res.about_me)
                }
            })
            .catch(err => {
                if (err.code === 404) {
                    navigate('/404', { replace: true })
                }
                console.error('Error fetching user: ', err)
            })
    }

    useEffect(() => {
        queryUser()
        if (paramsUserId === auth.user.id) {
            setEmail(auth.user.email)
        }
        queryAvatar()
    }, [])

    const handleClose = () => {
        setShowSnackbar(false)
    }
    const handleSubmit = () => {
        // upload image
        const formData = new FormData()
        const imageData = document.querySelector('input[type="file"]').files[0]

        if (imageData) {
            formData.append('file', imageData)

            const UPLOAD_URL = `http://localhost:3030/uploads?user_id=${auth.user.id}&access_token=${localStorage.getItem('feathers-jwt')}`

            fetch(UPLOAD_URL, {
                mode: 'no-cors',
                method: 'POST',
                body: formData
            })
                .then(res => console.log('uplaod res,', res))
                .then(() => setShowSnackbar(true))
                .catch(err => console.error('Error submitting profile: ', err))
        }

        // upload aboutme
        if (auth.user.about_me !== aboutMe) {
            client
                .service('users')
                .patch(auth.user.id, { about_me: aboutMe })
                .then(() => setShowSnackbar(true))
                .catch(err => console.error('Error submitting profile: ', err))
        }
    }
    const handlePhotoChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            setImgSrc(URL.createObjectURL(file))
        }
        // TODO: resize photo before upload
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleAboutMeChange = (event) => {
        setAboutMe(event.target.value)
    }

    return (
        <div>
            <Grid container justifyContent='center'>
                <Grid item sm={12} sx={{marginBottom: 2}}>
                    <Typography variant='h4' sx={{fontWeight: 'bold'}}>Profile</Typography>
                </Grid>
                <Grid item sm={10} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Box 
                        component='label'
                        className='photo-button' sx={{
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        border: `2px solid ${COLORS.grey}`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}>
                        <input
                            id='upload-file'
                            hidden
                            type='file'
                            accept='image/*'
                            disabled={paramsUserId !== auth.user.id}
                            onChange={handlePhotoChange}
                        />
                        {
                            imgSrc ?
                            <img
                                alt="user's photo"
                                src={imgSrc}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                            :
                            <AddIcon sx={{fontSize: 40}}/>
                        }
                    </Box>
                    <Typography variant='h5' sx={{fontWeight: 'bold', marginY: 2}}>{username}</Typography>
                    {
                        paramsUserId === auth.user.id &&
                        <TextField
                            label='Email Address'
                            name='email'
                            helperText="Others won't be able to see your email."
                            value={email}
                            disabled={true}
                            onChange={handleEmailChange}
                            variant='standard'
                            fullWidth
                            margin='normal'
                            id='email'
                            autoComplete='email'
                        />
                    }
                    <TextField
                        label='About me'
                        name='about-me'
                        value={aboutMe}
                        disabled={paramsUserId !== auth.user.id}
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
                {
                    paramsUserId === auth.user.id &&
                    <Grid item sm={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button
                            onClick={handleSubmit}
                            variant='contained'
                            sx={{
                                marginTop: 3,
                                marginBottom: 2,
                                borderRadius: 20,
                                paddingX: 3,
                                marginX: 3
                            }}
                        >Save</Button>
                    </Grid>
                }
            </Grid>
            <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Profile saved"
            />
        </div>
    )
}

export default ProfileScreen
