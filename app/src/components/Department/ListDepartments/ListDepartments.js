import React from 'react';
import {Table} from "react-bootstrap";
import {Link} from "react-router-dom";

function ListDepartments({departments, hideMaxSalaries}) {
    return <>
        <h2>Department List</h2>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                {hideMaxSalaries || <th>Max Salary</th>}
            </tr>
            </thead>
            <tbody>
            {departments.map((item, key) => <tr key={key}>
                <td>#{item.id}</td>
                <td><Link to={`/department/${item.id}`}>{item.name}</Link></td>
                {hideMaxSalaries || <td>{item.max_salary ?? 0}</td>}
            </tr>)}

            </tbody>
        </Table>
    </>;
}

export default ListDepartments;