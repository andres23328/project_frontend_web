import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <GoogleOAuthProvider clientId="1086203109768-qrtvmqag09t1mac3gfork0oeung1lrt7.apps.googleusercontent.com">
            <App />
        </GoogleOAuthProvider>
    </BrowserRouter>
);
