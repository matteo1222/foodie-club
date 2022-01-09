import React, { useState } from 'react'
import './index.css'
import CheckIcon from '@mui/icons-material/Check'

function Checkbox() {
    const [isChecked, setIsChecked] = useState(false)
    return (
        <label>
            <input
                type='checkbox'
                onChange={() => {
                    setIsChecked(!isChecked)
                }}
            />
            <div
                className={`checkbox ${isChecked ? 'checkbox--active' : ''}`}
                aria-hidden='true'
            >
                {isChecked && <CheckIcon fontSize='large' sx={{color: 'white'}}/>}
            </div>
        </label>
    )
}

export default Checkbox
