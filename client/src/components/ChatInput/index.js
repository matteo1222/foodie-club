import React from 'react'
import TextField from '@mui/material/TextField'
import { COLORS } from '../../constants/colors'

function ChatInput({ inputRef, onChange, onKeyPress, value }) {
    return (
        <TextField
            id='chat-input'
            fullWidth
            multiline
            maxRows={4}
            inputRef={inputRef}
            // helperText='Shift + Enter to change line'
            value={value}
            onChange={onChange}
            // onKeyPress={onKeyPress}
            InputProps={{
                sx: {
                    background: COLORS.white,
                    borderRadius: 5,
                    marginRight: 2,
                    position: 'absolute',
                    bottom: 0
                }
            }}
        />
    )
}

export default ChatInput
