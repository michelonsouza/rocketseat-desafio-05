import React from 'react';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import GlobalStyle from './styles/globals';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes />
      <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
