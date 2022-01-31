import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'

function LeaveGroupModal({ open, handleClose, handleSubmit }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='Leave group confirmation'
            aria-describedby='Leave group confirmation'
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                borderRadius: 5,
                boxShadow: 24,
                paddingY: 4,
                paddingX: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography variant='h5' sx={{marginBottom: 8}}>Are you sure you want to leave this group?</Typography>
                <Stack direction='row' justifyContent='center'>
                    <Button
                        variant='contained'
                        onClick={handleSubmit}
                        sx={{
                            marginTop: 5,
                            borderRadius: 20,
                            paddingX: 3,
                            marginX: 2,
                            opacity: '50%'
                        }}
                    >Leave</Button>
                    <Button
                        variant='contained'
                        onClick={handleClose}
                        sx={{
                            marginTop: 5,
                            borderRadius: 20,
                            paddingX: 3,
                            marginX: 2
                        }}
                    >Cancel</Button>
                </Stack>
            </Box>
        </Modal>
    )
}

export default LeaveGroupModal
