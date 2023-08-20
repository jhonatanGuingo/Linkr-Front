import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import ResetStyle from './styled/resetStyled.js';
import GlobalStyle from './styled/globalStyled.js';
import AuthProvider from './context/AuthProvider.js';
import DeleteProvider from './context/DeleteContext.js';
import EditProvider from './context/EditContext.js';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <DeleteProvider>
    <EditProvider>
      <ResetStyle />
      <GlobalStyle />
      <App />
    </EditProvider>
    </DeleteProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);