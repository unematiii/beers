import * as React from "react";
import { Provider } from "react-redux";

import { Home } from "src/home";
import { Store } from "../types";


interface AppProps {
    store: Store;
}
export const App: React.FC<AppProps> = ({ store }) =>
    <Provider store={store}>
        <Home/>
    </Provider>;
