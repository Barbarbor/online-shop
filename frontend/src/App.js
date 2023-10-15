import React from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './store/createStore'; // Import your Redux store
import AppRouter from './Router';

function App() {
    return (
        <Provider store={store}>
            <div>
                <AppRouter />
            </div>
        </Provider>
    );
}

export default App;