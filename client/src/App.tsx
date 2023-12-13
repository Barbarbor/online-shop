import React, { FC } from 'react'
import AppRouter from './components/AppRouter';
import NavPanel from './components/common/NavPanel';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './hooks/useUser';
const App : FC = () => {
    return (
        <UserContextProvider>
        <AppRouter/>
        </UserContextProvider>
    )
}

export default App;