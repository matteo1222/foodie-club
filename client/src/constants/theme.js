import { createTheme } from '@mui/material/styles'
import { COLORS } from './colors'

export const theme = createTheme({
    palette: {
        primary: {main: COLORS.black},
        secondary: {main: COLORS.red}
    },
});