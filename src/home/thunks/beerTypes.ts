
import { fetchStyles, Style, StylesResponse } from "src/api";
import { ThunkResult } from "src/core";
import { setBeerTypes, setError } from "../ducks";

function pickBeerTypes(stylesResponse: StylesResponse): Style[] {
    return stylesResponse.data.map(({ id, name }) => ({ id, name }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function getBeerTypes(): ThunkResult<void> {
    return (dispatch) => {
        fetchStyles()
            .then(stylesResponse => pickBeerTypes(stylesResponse))
            .then(beerTypes => dispatch(setBeerTypes(beerTypes)))
            .catch(() =>  dispatch(setError(true)));
    };
}
