import React, {useEffect, useState} from 'react';
import useAuthentication from "../../effects/Auth/useAuthentication";
import {axiosInstance} from "../../reusable/axios";
import Info from "../../components/Info/Info";
import CreateEmployee from "../../components/Employee/CreateEmployee/CreateEmployee";
import ListEmployees from "../../components/Employee/ListEmployees/ListEmployees";
import {useParams} from 'react-router-dom';

function Employee() {
    const [employees, setEmployees] = useState(null);
    const [info, setInfo] = useState(false);
    const auth = useAuthentication();
    const addEmployeeFn = (employee) => {
        setEmployees((currentValue) => [...currentValue, employee]);
    };
    const {departmentId} = useParams();
    const [departmentData, setDepartmentData] = useState(null);

    useEffect(() => {
        const url = '/employee' + (departmentId ? `?department_id=${departmentId}` : '');
        axiosInstance.get(url, {headers: auth.authHeaders})
            .then((result) => {
                setEmployees(result.data);
            })
            .catch((reason) => {
                if (reason.response?.status === 401) {
                    auth.resetAuth();
                }
                setInfo({
                    type: 'danger',
                    errors: reason.response?.data?.errors ?? {system: ['Unknown error']},
                });
            });

        axiosInstance.get(`/department/${departmentId}`, {headers: auth.authHeaders})
            .then((result) => setDepartmentData(result.data));
    }, []);

    return <>
        {!info || <Info {...info}/>}
        {!departmentData || <CreateEmployee addEmployeeFn={addEmployeeFn} departmentId={departmentData.id}/> }
        {!employees || <ListEmployees employees={employees} departmentData={departmentData}/>}
    </>;
}

export default Employee;