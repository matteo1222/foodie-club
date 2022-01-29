import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FilterListIcon from '@mui/icons-material/FilterList'
import { COLORS } from '../../constants/colors'
import Popover from '@mui/material/Popover'
import Chip from '@mui/material/Chip'
import Slider from '@mui/material/Slider'
import { foodTypes } from '../../constants/foodTypes'
import './index.css'

const FilterMenuGroup = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [timePref, setTimePref] = useState([])
    const [groupRange, setGroupRange] = useState([3, 6])
    const [pricePref, setPricePref] = useState([])
    const [foodPref, setFoodPref] = useState([])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleTimeClick = (value) => {
        console.log('value', value)
        console.log('timePref', timePref)
        if (value === null || value === undefined) {
            return
        }

        if (timePref.includes(value)) {
            setTimePref(timePref.filter(el => el !== value))
        } else {
            setTimePref([...timePref, value])
        }
    }

    const groupRangeText = (value) => {
        return `${value} people`
    }

    const handleGroupNumChange = (event, newValue) => {
        setGroupRange(newValue)
    }

    const handlePriceClick = (value) => {
        if (value === null || value === undefined) {
            return
        }

        if (pricePref.includes(value)) {
            setPricePref(pricePref.filter(el => el !== value))
        } else {
            setPricePref([...pricePref, value])
        }
    }

    const handleFoodClick = (value) => {
        if (value === null || value === undefined) {
            return
        }

        if (foodPref.includes(value)) {
            setFoodPref(foodPref.filter(el => el !== value))
        } else {
            setFoodPref([...foodPref, value])
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;
    return (
        <Box>
            <IconButton
                id={id}
                aria-label='join-group-filter-button'
                onClick={handleClick}
            >
                <FilterListIcon/>
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                >
                <Box sx={{background: COLORS.lightGrey, height: 600, overflowY: 'scroll', padding: 2}}>
                    {/* Time Preference */}
                    <Typography variant='subtitle1' sx={{fontWeight: 'bold', marginY: 1}}>Time</Typography>
                    <Box>
                        <Chip
                            label='Daytime'
                            variant='filled'
                            onClick={() => {handleTimeClick('daytime')}}
                            className={`chip-selector ${timePref.includes('daytime') ? 'chip-selector--active' : ''}`}
                            sx={{
                                marginX: 1
                            }}
                        />
                        <Chip
                            label='Night-time'
                            variant='filled'
                            onClick={() => {handleTimeClick('night-time')}}
                            className={`chip-selector ${timePref.includes('night-time') ? 'chip-selector--active' : ''}`}
                            sx={{
                                marginX: 1
                            }}
                        />
                    </Box>
                    {/* Group Size Preference */}
                    <Typography variant='subtitle1' sx={{fontWeight: 'bold', marginTop: 1, marginBottom: 5}}>Size of Group</Typography>
                    <Box>
                        <Slider
                            getAriaLabel={() => 'Group number range'}
                            value={groupRange}
                            onChange={handleGroupNumChange}
                            valueLabelDisplay='on'
                            getAriaValueText={groupRangeText}
                            color='secondary'
                            min={2}
                            max={8}
                        />
                    </Box>
                    {/* Price Preference */}
                    <Typography variant='subtitle1' sx={{fontWeight: 'bold', marginY: 1}}>Price</Typography>
                    <Box>
                        <Chip
                            label='£25 and under'
                            variant='filled'
                            onClick={() => {handlePriceClick('£25 and under')}}
                            className={`chip-selector ${pricePref.includes('£25 and under') ? 'chip-selector--active' : ''}`}
                            sx={{
                                marginX: 1
                            }}
                        />
                        <Chip
                            label='£26 to £40'
                            variant='filled'
                            onClick={() => {handlePriceClick('£26 to £40')}}
                            className={`chip-selector ${pricePref.includes('£26 to £40') ? 'chip-selector--active' : ''}`}
                            sx={{
                                marginX: 1
                            }}
                        />
                        <Chip
                            label='£41 and over'
                            variant='filled'
                            onClick={() => {handlePriceClick('£41 and over')}}
                            className={`chip-selector ${pricePref.includes('£41 and over') ? 'chip-selector--active' : ''}`}
                            sx={{
                                marginX: 1
                            }}
                        />
                        {/* <Chip
                            label='££££'
                            variant='filled'
                            onClick={() => {handlePriceClick('££££')}}
                            className={`chip-selector ${pricePref.includes('££££') ? 'chip-selector--active' : ''}`}
                            sx={{
                                marginX: 1
                            }}
                        /> */}
                    </Box>
                    {/* Food Preference */}
                    <Typography variant='subtitle1' sx={{fontWeight: 'bold', marginY: 1}}>Types of Cuisine</Typography>
                    <Box sx={{display: 'flex', flexWrap: 'wrap', width: 200}}>
                        {foodTypes.map(el => {
                            return (
                                <Chip
                                    key={el.id}
                                    label={el.label}
                                    variant='filled'
                                    onClick={() => {handleFoodClick(el.id)}}
                                    className={`chip-selector ${foodPref.includes(el.id) ? 'chip-selector--active' : ''}`}
                                    sx={{
                                        marginX: 1,
                                        marginY: 0.5
                                    }}
                                />
                            )
                        })}
                    </Box>
                </Box>
            </Popover>
        </Box>
    )
}

export default FilterMenuGroup
