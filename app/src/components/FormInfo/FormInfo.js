import React from 'react';
import {Alert} from "react-bootstrap";

function FormInfo({type, errors, message}) {

    if (errors) {
        return Object.entries(errors).map(([referenced, item], key) => {
                return item.map(message => <Alert key={key} variant={type}>{message}</Alert>);
            },
        );
    }

    if (message) {
        return <Alert variant={type}>{message}</Alert>;
    }
}

export default FormInfo;