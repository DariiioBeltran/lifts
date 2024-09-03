import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffd6ff"
    },
    secondary: {
      main: "#4f16cf"
    },
    error: {
      main: "#ff4203"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#000000"
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: '#ffd6ff', // Set label color
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#ffd6ff', // Set underline color
          },
          '& .MuiInputBase-input': {
            color: '#ffd6ff', // Set text color
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
// const root = document.getElementById('app') as HTMLElement;
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
