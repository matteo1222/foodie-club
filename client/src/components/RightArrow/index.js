import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import IconButton from '@mui/material/IconButton'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'


function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators, initComplete } = React.useContext(VisibilityContext);
  const [disabled, setDisabled] = React.useState(!initComplete || (initComplete && isLastItemVisible))

  React.useEffect(() => {
      if (visibleItemsWithoutSeparators.length) {
          setDisabled(isLastItemVisible)
      }
  }, [isLastItemVisible, visibleItemsWithoutSeparators])
  
  return (
    <IconButton
      disabled={disabled}
      disableRipple
      onClick={() => scrollNext()}
      sx={{visibility: disabled ? 'hidden' : 'visible'}}
  >
        <NavigateNextIcon/>
    </IconButton>
  );
}

export default RightArrow