import React from 'react';
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function ListEmployees({employees, departmentData}) {
    return <>
        <h2>Employee List{departmentData ? ` - Department ${departmentData.name}` : ''}</h2>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Salary</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((item, key) => <tr key={key}>
                <td>#{item.id}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.salary}</td>
            </tr>)}

            </tbody>
        </Table>
    </>;
}

export default ListEmployees;