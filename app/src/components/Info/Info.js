import React from 'react';
import {Alert} from "react-bootstrap";

function Info({type, message}) {
    return <Alert variant={type}>{message}</Alert>;
}

export default Info;