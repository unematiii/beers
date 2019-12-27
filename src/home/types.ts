import { Beer as ApiBeer, PagedResponse, Style } from "src/api";

export interface Country {
    displayName: string;
    isoCode: string;
    breweries: Record<string, true>;
}
export type Countries = Country[];
export type CountriesMapped = Record<string, Country>;
export type Beer = Pick<ApiBeer, 'id' | 'description'> & {
    displayName: string;
    breweries: string[];
};
export type Beers = Beer[];
export type BeerType = Style;
export type BeerTypes = BeerType[];
export type SearchPageInfo = Pick<PagedResponse, 'currentPage' | 'numberOfPages'>;
