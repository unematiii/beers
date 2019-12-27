import * as React from "react";
import { Spinner } from "react-bootstrap";

interface LoaderProps {
    center?: boolean;
}
export const Loader: React.FC<LoaderProps> = ({ center }) => {
    const style = center ? { width: '100%', textAlign: 'center' as 'center' } : undefined;
    return <div style={style}>
        <Spinner
            as="span"
            animation="grow" 
        >
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>;
};
