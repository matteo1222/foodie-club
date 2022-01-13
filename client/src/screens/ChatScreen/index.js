import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { COLORS } from '../../constants/colors'
import ChatMessage from '../../components/ChatMessage'
import { chatMessages } from '../../mockData/chatMessages'
import ChatInput from '../../components/ChatInput'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'

function ChatScreen() {
    const chatInputRef = useRef(null)
    const [chatValue, setChatValue] = useState('')
    let params = useParams()

    const handleChatInputChange = (event) => {
        setChatValue(event.target.value)
    }
    return (
        <Grid container sx={{
            background: COLORS.lightGrey,
            width: '100%',
            padding: 2
        }}>
            <Grid item sm={12}>
                <Stack direction='column' sx={{
                    height: 500
                }}>
                    {chatMessages.map(el => {
                        return (
                            <ChatMessage
                                username={el.username}
                                userAvatarSrc={el.userAvatarSrc}
                                message={el.message}
                                isMine={el.userId === '2'}
                                key={el.userId}
                            />
                        )
                    })}
                </Stack>
            </Grid>
            <Grid item sm={12}>
                <Stack direction='row' justifyContent='center' alignItems='end'>
                    <ChatInput
                        inputRef={chatInputRef}
                        onChange={handleChatInputChange}
                        value={chatValue}
                    />
                    <IconButton aria-label='chat-send-button' sx={{marginX: 2}}>
                        <SendIcon/>
                    </IconButton>
                </Stack>
            </Grid>
            <Grid item sm={12}>
                <Stack direction='row' justifyContent='center'>
                    <Button
                        type='submit'
                        variant='contained'
                        sx={{
                            marginTop: 3,
                            marginBottom: 2,
                            borderRadius: 20,
                            marginX:1
                        }}
                    >Confirm to Join</Button>
                    <Button
                        type='submit'
                        variant='contained'
                        color='error'
                        sx={{
                            marginTop: 3,
                            marginBottom: 2,
                            borderRadius: 20,
                            marginX: 1
                        }}
                    >Leave Group</Button>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default ChatScreen
