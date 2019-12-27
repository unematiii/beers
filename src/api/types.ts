export interface Brewery {
    id: string;
}

export interface Beer {
    id: string;
    nameDisplay: string;
    description: string;
    breweries: Brewery[];
}

export interface Location {
    breweryId: string;
    country: {
        isoCode: string;
        displayName: string;
    }
}

export interface Style {
    id: string;
    name: string;
}

export interface PagedResponse {
    currentPage: number;
    numberOfPages: number;
    totalResults: number;
}

export enum ResponseStatus {
    SUCCESS = 'success',
}

export interface Response<T> {
    data: T[];
    status: ResponseStatus | any;
}

export type BeersResponse = PagedResponse & Response<Beer>;
export type LocationResponse = PagedResponse & Response<Location>;
export type StylesResponse = Response<Style>;

export type ApiResponse = BeersResponse | LocationResponse | StylesResponse;
