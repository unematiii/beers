import * as React from "react";
import { Button, Card } from "react-bootstrap";

import { Loader } from "src/core";
import { Beers } from "../types";


interface BeerListItemProps {
    displayName: string;
    description: string;
}
const BeerListItem: React.FC<BeerListItemProps> = ({ displayName, description }) =>
    <Card border="light">
        <Card.Body>
            <Card.Title>{displayName}</Card.Title>
            <Card.Text>{description || 'No description'}</Card.Text>
        </Card.Body>
    </Card>;

interface LoadMoreButtonProps {
    onClick: () => void;
}
const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick })  =>
    <div style={{ padding: '0 1.25rem' }}>
        <Button 
            variant="outline-primary" 
            size="lg"
            onClick={() => onClick()}
            block
        >
            More results
        </Button>
    </div>;

interface BeerListProps {
    beers: Beers;
    hasMoreResults: boolean;
    isSearching: boolean;
    onLoadMore: () => void;
}
export const BeerList: React.FC<BeerListProps> = ({ 
    beers, hasMoreResults, isSearching, onLoadMore 
}) =>
    <Card body>
        {!isSearching && beers.length == 0 && <span>No results</span>}
        {beers.map(beer =>
            <BeerListItem {...beer} key={beer.id} />)}
        {isSearching && <Loader center />}
        {!isSearching && hasMoreResults && <LoadMoreButton onClick={onLoadMore} />}
    </Card>;
