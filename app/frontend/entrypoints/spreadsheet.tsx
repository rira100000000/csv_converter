import React from 'react';
import ReactDOM from 'react-dom/client';
import SpreadSheet from '../../views/spreadsheet/SpreadSheet';
import '../../assets/stylesheets/output.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SpreadSheet />
  </React.StrictMode>
);
