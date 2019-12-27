import * as React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { Loader, Nullable } from "src/core";
import { BeerTypes, Countries } from "../types";

type FormEvent = React.ChangeEvent<HTMLInputElement>;

interface NameFieldProps {
    onChange: (value: string) => void;
    value?: string;
}
const NameField: React.FC<NameFieldProps> = ({ value, onChange }) =>
    <Form.Group
        as={Row}
        controlId="name"
    >
        <Form.Label column lg={12}>Search by name</Form.Label>
        <Col>
            <Form.Control
                type="text"
                value={value || ''}
                onChange={(e: FormEvent) => onChange(e.target.value)}
            />
        </Col>
    </Form.Group>;

interface TypeSelectorProps {
    types: Nullable<BeerTypes>;
    value?: string;
    onChange: (value: string) => void;
}
const TypeSelector: React.FC<TypeSelectorProps> = ({ types, value, onChange }) =>
    <Form.Group
        as={Row}
        controlId="type"
    >
        <Form.Label column lg={12}>Filter by type</Form.Label>
        <Col>
            {!types && <Loader />}
            {types &&
                <Form.Control
                    as="select"
                    onChange={(e: FormEvent) => onChange(e.target.value)}
                    value={value || '-1'}
                >
                    <option
                        key={0}
                        value={'-1'}
                    >
                        All types
                    </option>
                    {types.map(({ id, name }) =>
                        <option
                            value={id}
                            key={id}
                        >
                            {name}
                        </option>)}
                </Form.Control>}
        </Col>
    </Form.Group>;

interface CountrySelectorProps {
    countries: Nullable<Countries>;
    value?: string;
    onChange: (value: string) => void;
}
const CountrySelector: React.FC<CountrySelectorProps> = ({ countries, value, onChange }) =>
    <Form.Group
        as={Row}
        controlId="country"
    >
        <Form.Label column lg={12}>Filter by country</Form.Label>
        <Col>
            {!countries && <Loader />}
            {countries &&
                <Form.Control
                    as="select"
                    onChange={(e: FormEvent) => onChange(e.target.value)}
                    value={value || '-1'}
                >
                    <option
                        key={0}
                        value={'-1'}
                    >
                        All countries
                    </option>
                    {countries.map(({ displayName, isoCode }) =>
                        <option
                            value={isoCode}
                            key={isoCode}
                        >
                            {displayName}
                        </option>)}
                </Form.Control>}
        </Col>
    </Form.Group>;

interface SearchButtonProps {
    onClick: () => void;
    onReset: () => void;
}
const SearchButtons: React.FC<SearchButtonProps> = ({ onClick, onReset }) =>
    <Row>
        <Col lg={12}>
            <Button 
                variant="primary"
                onClick={onClick}
                style={{ marginRight: '1rem' }}
            >
                Search / Filter
            </Button>
            <Button 
                variant="outline-primary"
                onClick={onReset}
            >
                Reset
            </Button>
        </Col>
    </Row>;

interface SearchBarProps {
    countries: Nullable<Countries>;
    types: Nullable<BeerTypes>;
    onSearch: (name?: string, typeId?: string, countryCode?: string) => void;
}

interface SearchBarState {
    name?: string;
    type?: string;
    country?: string;
}

const initialState: SearchBarState = { 
    name: undefined, 
    country: undefined, 
    type: undefined,
};

export class SearchBar extends React.PureComponent<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps) {
        super(props);

        this.state = { ...initialState };
    }

    onNameChanged = (value: string) => {
        this.setState({ name: value.length ? value : undefined });
    }

    onTypeChanged = (value: string) => {
        this.setState({ type: value == '-1' ? undefined : value });
    }

    onCountryChanged = (value: string) => {
        this.setState({ country: value == '-1' ? undefined : value });
    }

    doSearch = () => {
        const { name, type, country } = this.state;
        this.props.onSearch(name, type, country);
    }

    reset = () => {
        this.setState({ ...initialState });
    }

    render() {
        const { countries, types } = this.props;
        const { name, country, type } = this.state;

        return <Card body style={{ margin: '0 auto 1rem' }}>
            <NameField 
                value={name}
                onChange={this.onNameChanged} 
            />
            <TypeSelector
                types={types}
                value={type}
                onChange={this.onTypeChanged}
            />
            <CountrySelector
                countries={countries}
                value={country}
                onChange={this.onCountryChanged}
            />
            <SearchButtons 
                onClick={this.doSearch} 
                onReset={this.reset}
            />
        </Card>;
    }
}
