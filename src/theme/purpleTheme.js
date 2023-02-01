import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

// Create theme has a default theme and we overwrite what we desire
export const purpleTheme = createTheme({
    palette: {
        primary: {
            main : '#538083'
        },
        secondary: {
            main: '#543884'
        },
        error: {
            main: red.A400
        }
    }
})
