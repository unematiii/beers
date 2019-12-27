
import * as React from "react";
import { Modal } from "react-bootstrap";

const noop = () => {};
export const Error = () => 
    <Modal 
        size="lg" 
        onHide={noop}
        centered 
        show
    >
        <Modal.Header>
            <Modal.Title>Oh snap! Something went wrong!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>
                You might want to <a href="#" onClick={() => window.location.reload()}>reload</a> the page or try again later...
            </p>
        </Modal.Body>
    </Modal>;
