import { Nullable, StoreState } from "src/core";
import { Beers, BeerTypes, Countries, Country, SearchPageInfo } from "../types";

const ADD_BEERS_TO_LIST = 'ADD_BEERS_TO_LIST';
const CLEAR_BEER_LIST = 'CLEAR_BEER_LIST';
const SET_BEER_TYPES = 'SET_BEER_TYPES';
const SET_COUNTRIES = 'SET_COUNTRIES';
const SET_ERROR = 'SET_ERROR';
const SET_IS_SEARCHING = 'SET_IS_SEARCHING';
const SET_SEARCH_ID = 'SET_SEARCH_ID';
const SET_SEARCH_PAGE_INFO = 'SET_SEARCH_PAGE_INFO';
const SET_SEARCH_PARAMS = 'SET_SEARCH_PARAMS';

interface AddBeersToListAction {
    type: typeof ADD_BEERS_TO_LIST;
    payload: Beers;
}

export function addBeersToList(beers: Beers): AddBeersToListAction {
    return {
        type: ADD_BEERS_TO_LIST,
        payload: beers,
    };
}

interface ClearBeersListAction {
    type: typeof CLEAR_BEER_LIST;
}

export function clearBeersList(): ClearBeersListAction {
    return { type: CLEAR_BEER_LIST };
}

interface SetCountriesAction {
    type: typeof SET_COUNTRIES;
    payload: Countries;
}

export function setCountries(countries: Countries): SetCountriesAction {
    return {
        type: SET_COUNTRIES,
        payload: countries,
    };
}

interface SetBeerTypesAction {
    type: typeof SET_BEER_TYPES;
    payload: BeerTypes;
}

export function setBeerTypes(beerTypes: BeerTypes): SetBeerTypesAction {
    return {
        type: SET_BEER_TYPES,
        payload: beerTypes,
    };
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: boolean;
}

export function setError(hasError: boolean): SetErrorAction {
    return {
        type: SET_ERROR,
        payload: hasError,
    };
}

interface SetIsSearchingAction {
    type: typeof SET_IS_SEARCHING;
    payload: boolean;
}

export function setIsSearching(isSearching = true): SetIsSearchingAction {
    return {
        type: SET_IS_SEARCHING,
        payload: isSearching,
    };
}

interface SetSearchIdAction {
    type: typeof SET_SEARCH_ID;
    payload: Nullable<string>;
}

export function setSearchId(id: Nullable<string>): SetSearchIdAction {
    return {
        type: SET_SEARCH_ID,
        payload: id,
    };
}

interface SetSearchParamsAction {
    type: typeof SET_SEARCH_PARAMS;
    payload: SearchParams;
}

export function setSearchParams(parameters: SearchParams): SetSearchParamsAction {
    return {
        type: SET_SEARCH_PARAMS,
        payload: parameters,
    };
}

interface SetSearchPageInfoAction {
    type: typeof SET_SEARCH_PAGE_INFO;
    payload: Nullable<SearchPageInfo>;
}

export function setSearchPageInfo(pageInfo: Nullable<SearchPageInfo>): SetSearchPageInfoAction {
    return {
        type: SET_SEARCH_PAGE_INFO,
        payload: pageInfo,
    };
}

export interface SearchParams {
    name?: string;
    beerType?: string;
    country?: string;
}

export interface HomeState {
    beers: Beers;
    beerTypes: Nullable<BeerTypes>;
    countries: Nullable<Countries>;
    hasError: boolean;
    isSearching: boolean;
    searchId: Nullable<string>;
    searchParams: SearchParams;
    searchPages: Nullable<SearchPageInfo>;
}

const initialState: HomeState = {
    beers: [],
    beerTypes: null,
    countries: null,
    hasError: false,
    isSearching: true,
    searchId: null,
    searchParams: {},
    searchPages: null,
};

type HomeAction =
    AddBeersToListAction |
    ClearBeersListAction |
    SetBeerTypesAction |
    SetCountriesAction |
    SetErrorAction |
    SetIsSearchingAction |
    SetSearchIdAction |
    SetSearchPageInfoAction |
    SetSearchParamsAction;

export function homeReducer(state = initialState, action: HomeAction): HomeState {
    switch (action.type) {
        case ADD_BEERS_TO_LIST:
            return { ...state, beers: state.beers.concat(action.payload) };
        case CLEAR_BEER_LIST:
            return { ...state, beers: initialState.beers };
        case SET_COUNTRIES:
            return { ...state, countries: action.payload };
        case SET_ERROR:
            return { ...state, hasError: action.payload };
        case SET_IS_SEARCHING:
            return { ...state, isSearching: action.payload };
        case SET_SEARCH_ID:
            return { ...state, searchId: action.payload };
        case SET_SEARCH_PAGE_INFO:
            return { ...state, searchPages: action.payload };
        case SET_SEARCH_PARAMS:
            return { ...state, searchParams: action.payload };
        case SET_BEER_TYPES:
            return { ...state, beerTypes: action.payload };
        default:
            return state;
    }
}

export function selectBeers(state: StoreState): Beers {
    return state.home.beers;
}

export function selectCountries(state: StoreState): Nullable<Countries> {
    return state.home.countries;
}

export function selectCountry(countryCode: string, state: StoreState): Country | undefined {
    return state.home.countries!!.find(({ isoCode }) => isoCode == countryCode);
}

export function selectHasMoreResults(state: StoreState): boolean {
    const pageInfo = selectSearchPages(state);
    return !!pageInfo && pageInfo.currentPage < pageInfo.numberOfPages;
}

export function selectHasError(state: StoreState): boolean {
    return state.home.hasError;
}

export function selectIsSearching(state: StoreState): boolean {
    return state.home.isSearching;
}

export function selectSearchId(state: StoreState): Nullable<string> {
    return state.home.searchId;
}

export function selectSearchParams(state: StoreState): SearchParams {
    return state.home.searchParams;
}

export function selectSearchPages(state: StoreState): Nullable<SearchPageInfo> {
    return state.home.searchPages;
}

export function selectTypes(state: StoreState): Nullable<BeerTypes> {
    return state.home.beerTypes;
}
