import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { Auth0Provider } from '@auth0/auth0-react';


axios.defaults.baseURL ="https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = `Bearer  ${process.env.REACT_APP_ACCESS_TOKEN}`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Auth0Provider
      domain="dev-qe401f841z8i775s.us.auth0.com"
      clientId="gfQm53ESo4n6OzLw30K5Wc8RZwk5YXuB"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >

      <Provider store={store}>
        <ThemeProvider theme={theme}>
           <App />
        </ThemeProvider>
   
       </Provider>
    </Auth0Provider>
  </React.StrictMode> 
);

