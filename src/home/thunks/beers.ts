import { uniqueId } from "lodash-es";

import { BeersResponse, fetchBeers } from "src/api";
import { ThunkResult } from "src/core";
import { 
    addBeersToList, 
    clearBeersList, 
    selectCountry,
    selectSearchId,
    selectSearchPages,
    selectSearchParams,
    setError,
    setIsSearching, 
    setSearchId,
    setSearchParams, 
    setSearchPageInfo,
    SearchParams,
} from "../ducks";
import { Beers, Country } from "../types";

const MIN_FILTERED_RESULTS = 50;

function pickBeers(beersResponse: BeersResponse): Beers {
    return beersResponse.data.map(({ id, nameDisplay, description, breweries }) => ({
        id, 
        displayName: nameDisplay, 
        description, 
        breweries: breweries.map(({ id }) => id),
    }));
}

function filterByCountry(beers: Beers, { breweries }: Country): Beers {
    return beers.filter(beer => {
        return !!beer.breweries.find(id => breweries[id]);
    });
}

export function searchParamsChanged(
    searchParams: SearchParams, name?: string, beerType?: string, country?: string,
): boolean {
    return searchParams.name != name || 
        searchParams.beerType != beerType || 
        searchParams.country != country;
}

export function searchBeers(
    name?: string, beerType?: string, country?: string, resultsCount = 0,
): ThunkResult<void> {
    return (dispatch, getState) => {;
        const state = getState();
        const searchParams = selectSearchParams(state);
        const pageInfo = selectSearchPages(state);
        const isNewSearch = searchParamsChanged(searchParams, name, beerType, country);
        const searchId = isNewSearch ? uniqueId() : selectSearchId(state);

        if (isNewSearch) {
            dispatch(setSearchParams({ name, beerType, country }));
            dispatch(clearBeersList());
            dispatch(setSearchPageInfo(null));
            dispatch(setSearchId(searchId));
        }

        dispatch(setIsSearching());

        fetchBeers(isNewSearch || !pageInfo ? 1 : pageInfo.currentPage + 1, name, beerType)
            .then(beersResponse => {
                // Check for another in-progress query 
                if(selectSearchId(getState()) !== searchId) {
                    return;
                }
                
                // Parse and filter results
                const { numberOfPages, currentPage } = beersResponse;
                const beers = pickBeers(beersResponse);
                const results = country ? filterByCountry(beers, selectCountry(country, state) as Country) : beers;
                const resultsFetched = results.length + resultsCount;

                dispatch(setSearchPageInfo({ numberOfPages, currentPage }));
                dispatch(addBeersToList(results));

                if (resultsFetched < MIN_FILTERED_RESULTS && currentPage < numberOfPages) {
                    dispatch(searchBeers(name, beerType, country, resultsFetched));
                } else {
                    dispatch(setIsSearching(false));
                }
            })
            .catch(() => {
                dispatch(setSearchPageInfo(null));
                dispatch(setIsSearching(false));
                dispatch(setError(true));
            });
    };
}
