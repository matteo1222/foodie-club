import React from 'react'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import IconButton from '@mui/material/IconButton'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'


function LeftArrow() {
    const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } = React.useContext(VisibilityContext);
    const [disabled, setDisabled] = React.useState(!initComplete || (initComplete && isFirstItemVisible))

    React.useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isFirstItemVisible)
        }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators])
    return (
    <IconButton
        disabled={disabled}
        disableRipple
        onClick={() => scrollPrev()}
        sx={{visibility: disabled ? 'hidden' : 'visible'}}
    >
          <NavigateBeforeIcon/>
      </IconButton>
    );
}

export default LeftArrow