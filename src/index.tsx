import * as React from "react";
import * as ReactDOM from "react-dom";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import { App, rootReducer, Store } from "./core";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store: Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
);
