import buildUrl from "build-url";

import { API_BEERS, API_ENDPOINT, API_LOCATIONS, API_STYLES } from "./constants";
import { BeersResponse, LocationResponse, ResponseStatus, StylesResponse } from "./types";

function apiGet<T>(path: string): Promise<T> {
    return fetch(path)
        .then((response: Response) => response.json())
        .then(response =>
            new Promise((resolve, reject) => {
                if (response.status != ResponseStatus.SUCCESS){
                    reject();
                } else {
                    if(!response.data) {
                        response.data = [];
                    }
                    resolve(response);
                }  
            }));
}

function getUrl(entity: string, params = {}): string {
    return buildUrl(API_ENDPOINT, {
        path: entity,
        queryParams: {
            ...params,
        },
    });
}

export function fetchBeers(pageId = 1, name?: string, styleId?: string): Promise<BeersResponse> {
    return apiGet<BeersResponse>(getUrl(API_BEERS, {
        p: pageId,
        withBreweries: 'Y',
        ... name ? { name } : {},
        ... styleId ? { styleId } : {},
    }));
}

export function fetchLocations(pageId = 1): Promise<LocationResponse> {
    return apiGet<LocationResponse>(getUrl(API_LOCATIONS, { p: pageId }))
        .then((response: LocationResponse) => {
            if (response.currentPage < response.numberOfPages) {
                return fetchLocations(pageId + 1).then((nextPage: LocationResponse) => {
                    return {
                        ...nextPage,
                        data: [
                            ...nextPage.data,
                            ...response.data,
                        ]
                    };
                });
            } else {
                return response;
            }
        });
}

export function fetchStyles(): Promise<StylesResponse> {
    return apiGet<StylesResponse>(getUrl(API_STYLES));
}
