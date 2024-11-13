import { Routes } from 'react-router-dom';
import './css/index.css';
import { AppRouter, ROUTES } from './router';
import React from 'react';

const App: React.FC = () => {
  return (
    <Routes>
      {AppRouter(ROUTES.map((route) => ({ ...route, children: [] })))}
    </Routes>
  );
};

export default App;
