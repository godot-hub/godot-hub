import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store'

const Index = () => (
    <>
        <h1>Godot Hub</h1>
    </>
);

render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.querySelector("#godot-hub")
);
