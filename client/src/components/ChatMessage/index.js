import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { COLORS } from '../../constants/colors'

function ChatMessage({username, userAvatarSrc, message, isMine}) {
    return (
        <Stack direction='row' alignItems='center' sx={{
            marginX: 2,
            marginY: 1.5
        }}>
            {
                !isMine && 
                <Stack direction='column' alignItems='center' sx={{
                    marginRight: 1.5
                }}>
                    <Avatar alt={username} src={userAvatarSrc}/>
                    <Typography variant='body2'>{username}</Typography>
                </Stack>
            }
            <Box sx={{
                background: isMine ? COLORS.yellow : COLORS.white,
                boxShadow: `0px 4px 10px ${COLORS.grey}`,
                paddingX: 1.5,
                paddingY: 1,
                borderRadius: isMine ? '15px 15px 0px 15px' : '15px 15px 15px 0px',
                maxWidth: 400,
                marginLeft: isMine ? 'auto' : 0
            }}>
                <Typography variant='body1'>{message}</Typography>
            </Box>
            
        </Stack>
    )
}

export default ChatMessage
