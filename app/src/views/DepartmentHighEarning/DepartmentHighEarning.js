import React, {useEffect, useState} from 'react';
import CreateDepartment from "../../components/Department/CreateDepartment/CreateDepartment";
import {axiosInstance} from "../../reusable/axios";
import Info from "../../components/Info/Info";
import useAuthentication from "../../effects/Auth/useAuthentication";
import ListDepartments from "../../components/Department/ListDepartments/ListDepartments";

function DepartmentHighEarning() {
    const [departments, setDepartments] = useState(null);
    const [info, setInfo] = useState(false);
    const auth = useAuthentication();

    useEffect(() => {
        axiosInstance.get('/department?min_salary=50000&min_no_of_employees_min_salary=2', {headers: auth.authHeaders}).then((result) => {
            setDepartments(result.data)
        }).catch((reason) => {
            if (reason.response?.status === 401) {
                auth.resetAuth();
            }
            setInfo({
                type: 'danger',
                errors: reason.response?.data?.errors ?? {system: ['Unknown error']},
            });
        });
    }, []);

    return <>
        {!info || <Info {...info}/>}
        {!departments || <ListDepartments departments={departments} hideMaxSalaries />}
    </>;
}

export default DepartmentHighEarning;