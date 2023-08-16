import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import ResetStyle from './styled/resetStyled.js';
import GlobalStyle from './styled/globalStyled.js';
import AuthProvider from './context/AuthProvider.js';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ResetStyle />
      <GlobalStyle />
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);