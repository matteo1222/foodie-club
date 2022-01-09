import React from 'react'
import './index.css'

function Header() {
    return (
        <header className='header-container'>
            <div className='header-title-container'>
                <h1 className='header-title'>Sign Up.</h1>
                <h1 className='header-title'>Get Matched.</h1>
                <h1 className='header-title'>Dine Together.</h1>
            </div>
            <h5 className='header-text'>Foodie Club</h5>
        </header>
    )
}

export default Header
