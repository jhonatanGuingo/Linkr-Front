import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import ResetStyle from './styled/resetStyled.js';
import GlobalStyle from './styled/globalStyled.js';

ReactDOM.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);