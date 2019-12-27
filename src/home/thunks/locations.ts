import { fetchLocations, Location, LocationResponse } from "src/api";
import { ThunkResult } from "src/core";
import { setCountries, setError } from "../ducks";
import { Countries, CountriesMapped } from "../types";


function pickCountries(locations: LocationResponse): Countries {
    const countriesMapped = locations.data.reduce(
        (countriesMapped: CountriesMapped, { breweryId, country }: Location) => {
            const { displayName, isoCode } = country;
            if(countriesMapped[isoCode]) {
                countriesMapped[isoCode].breweries[breweryId] = true;
            } else {
                countriesMapped[isoCode] = {
                    displayName,
                    isoCode: isoCode,
                    breweries: {
                        [breweryId]: true,
                    }
                };
            }
            return countriesMapped;
        }, {});

    return Object.values(countriesMapped)
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export function getCountries(): ThunkResult<void> {
    return (dispatch) => {
        fetchLocations()
            .then(locationsResponse => {
                return pickCountries(locationsResponse);
            })
            .then(countries => {
                dispatch(setCountries(countries));
            })
            .catch(() => {
                dispatch(setError(true));
            });
    };
}