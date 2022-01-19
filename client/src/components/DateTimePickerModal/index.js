import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import DateAdapter from '@mui/lab/AdapterDayjs'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function DateTimePickerModal({ dateTime, handleDateTimeChange, open, handleClose, handleSubmit }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='Pick a date and time'
            aria-describedby='Select date and time for the group'
        >
            <LocalizationProvider dateAdapter={DateAdapter}>
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
                    <Typography variant='h5' sx={{marginBottom: 8}}>Pick a Date and Time</Typography>
                    <DateTimePicker
                        label='Date&Time picker'
                        value={dateTime}
                        onChange={handleDateTimeChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Button
                        variant='contained'
                        onClick={handleSubmit}
                        sx={{
                            marginTop: 8,
                            borderRadius: 20,
                            paddingX: 3,
                            marginX: 3
                        }}
                    >Start Group</Button>
                </Box>
            </LocalizationProvider>
        </Modal>
    )
}

export default DateTimePickerModal
