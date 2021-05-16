import React, {useEffect, useState} from 'react';
import CreateDepartment from "../../components/Department/CreateDepartment/CreateDepartment";
import {axiosInstance} from "../../reusable/axios";
import Info from "../../components/Info/Info";
import useAuthentication from "../../effects/Auth/useAuthentication";
import ListDepartments from "../../components/Department/ListDepartments/ListDepartments";

function Department() {
    const [departments, setDepartments] = useState(null);
    const [info, setInfo] = useState(false);
    const auth = useAuthentication();
    const addDepartmentFn = (department) => {
        setDepartments((currentValue) => [...currentValue, department]);
    };

    useEffect(() => {
        axiosInstance.get('/department?include_max_salary=1', {headers: auth.authHeaders}).then((result) => {
            setDepartments(result.data);
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
        <CreateDepartment addDepartmentFn={addDepartmentFn}/>
        {!departments || <ListDepartments departments={departments}/>}
    </>;
}

export default Department;