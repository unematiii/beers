import { Store as ReduxStore } from "redux";
import { ThunkAction } from "redux-thunk";

import { HomeState } from "../home";


export type Nullable<T> = T | null;

export type StoreState = {
    home: HomeState;
};

export type Store = ReduxStore<StoreState>;

export type ThunkResult<R> = ThunkAction<R, StoreState, undefined, any>
