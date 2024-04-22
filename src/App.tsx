import React from 'react';
import logo from './logo.svg';
import {Box} from '@mui/material'
import './App.css';
import Tables from './Components/Tables/Tables';
import Header from './Components/Header/Header';

function App() {
  return (
    <Box>
      <Header/>
      <Tables/>
    </Box>
  );
}

export default App;
