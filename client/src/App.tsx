import React, { FC } from 'react'
import AppRouter from './components/AppRouter';
import NavPanel from './components/common/NavPanel';
import { BrowserRouter } from 'react-router-dom';

const App : FC = () => {
    return (
        <AppRouter/>
    )
}

export default App;