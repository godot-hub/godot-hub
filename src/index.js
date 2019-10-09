import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store'

const Index = () => (
    <Provider store={store}>
        <h1>Godot Hub</h1>
    </Provider>
);

render(
    <Index />,
    document.querySelector("#godot-hub")
);
