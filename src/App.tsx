import './App.css';
import {FC} from "react"
import { HomePage } from './screens/home';
import { createTheme } from '@mui/material/styles';
// @ts-ignore
import SarasaTtf from './fonts/sarasa-ui-sc-regular.ttf'
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
    typography: {
        fontFamily:  [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Sarasa UI SC"'
        ].join(','),

    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
            @font-face {
              font-family: 'Sarasa UI SC';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('Sarasa UI SC'), url(${SarasaTtf}) format('ttf');
            }
      `,
        },
    },
});

const App:FC =() => (
    <ThemeProvider theme={theme}>
        <HomePage/>
    </ThemeProvider>

)

export default App;
