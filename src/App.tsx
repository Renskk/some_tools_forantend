import './App.css';
import { FC } from "react"
import { HomePage } from './screens/home';
import { createTheme } from '@mui/material/styles';
// @ts-ignore
import SarasaTtf from './fonts/sarasa-ui-sc-regular.ttf'
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const theme = createTheme({
    typography: {
        fontFamily: [
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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
})

const App: FC = () => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <HomePage />
        </ThemeProvider>
    </QueryClientProvider>


)

export default App;
