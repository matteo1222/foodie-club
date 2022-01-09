import React from 'react'
import './index.css'

function StepIndicator({ steps, currentStep }) {
    return (
        <div className='step-container'>
            {new Array(steps).fill(null).map((el, idx) => {
                return (
                    <div className={`step-circle ${currentStep === idx + 1 ? 'step-circle--active' : ''}`}></div>
                )
            })}
        </div>
    )
}

export default StepIndicator
