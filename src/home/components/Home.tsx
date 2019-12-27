import * as React from "react";
import { Container, Col, Jumbotron, Row } from "react-bootstrap";
import { connect } from "react-redux";

import { Error, StoreState } from "src/core";
import { 
    selectBeers, 
    selectCountries, 
    selectHasError,
    selectHasMoreResults, 
    selectIsSearching,  
    SearchParams,
    selectSearchParams,
    selectTypes,
} from "../ducks";
import { getBeerTypes, getCountries, searchBeers, searchParamsChanged } from "../thunks";
import { Beers, BeerTypes, Countries } from "../types";
import { BeerList } from "./BeerList";
import { SearchBar } from "./SearchBar";


type HomeDispatchProps = {
    getBeerTypes: typeof getBeerTypes;
    getCountries: typeof getCountries;
    searchBeers: typeof searchBeers;
};
type HomeStateProps = {
    beers: Beers,
    countries: Countries | null;
    hasError: boolean;
    hasMoreResults: boolean;
    isSearching: boolean;
    searchParams: SearchParams;
    types: BeerTypes | null;
};
type HomeProps = HomeStateProps & HomeDispatchProps;

export class HomeComponent extends React.Component<HomeProps> {
    onSearch = (name?: string, beerType?: string, country?: string) => {
        if(searchParamsChanged(this.props.searchParams, name, beerType, country)) {
            this.props.searchBeers(name, beerType, country);
        } 
    }

    onLoadMore = () => {
        const { name, beerType, country } = this.props.searchParams;
        this.props.searchBeers(name, beerType, country);
    }

    componentDidMount() {
        this.props.getCountries();
        this.props.getBeerTypes();
        this.props.searchBeers();
    }

    render() {
        const { beers, countries, hasError, hasMoreResults, isSearching, types } = this.props;
        return <Container style={{ margin: '1rem auto' }}>
            <Row>
                <Col lg={12}>
                    <Jumbotron style={{ padding: '2rem' }}>
                        <h1>Beers</h1>
                        <p>Simple app for searching beers using BreweryDB API</p>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col lg="4">
                    <SearchBar 
                        countries={countries}
                        types={types}
                        onSearch={this.onSearch}
                    />
                </Col>
                <Col>
                    <BeerList 
                        beers={beers} 
                        hasMoreResults={hasMoreResults}
                        isSearching={isSearching} 
                        onLoadMore={this.onLoadMore}
                    />
                </Col>
            </Row>
            {hasError && <Error />}
        </Container>;
    }
};

const mapDispatchToProps = {
    getBeerTypes,
    getCountries,
    searchBeers,
};
const mapStateToProps = (state: StoreState) => ({
    beers: selectBeers(state),
    countries: selectCountries(state),
    hasError: selectHasError(state),
    hasMoreResults: selectHasMoreResults(state),
    isSearching: selectIsSearching(state),
    searchParams: selectSearchParams(state),
    types: selectTypes(state),
});

export const Home = connect<HomeStateProps, HomeDispatchProps>
    (mapStateToProps, mapDispatchToProps)(HomeComponent);
