import React, {useEffect, useState} from 'react';
import useFormData from "../../../effects/Form/useFormData";
import useAuthentication from "../../../effects/Auth/useAuthentication";
import {axiosInstance} from "../../../reusable/axios";
import FormInfo from "../../FormInfo/FormInfo";
import {Button, Form} from "react-bootstrap";

function CreateEmployee({addEmployeeFn, departmentId}) {
    const [formInfo, setFormInfo] = useState();
    const {formData, updateFormData} = useFormData({department_id: departmentId});
    const auth = useAuthentication();

    const submit = (e) => {
        e.preventDefault();
        axiosInstance.put('/employee', formData, {headers: auth.authHeaders}).then((result) => {
            addEmployeeFn(result.data);
        }).catch(reason => {
            setFormInfo({
                type: 'danger',
                errors: reason.response?.data?.errors ?? {system: ['Unknown error']},
            });
        });
    };

    return <>
        {
            !formInfo || <FormInfo {...formInfo} />
        }
        <Form>
            <h2>Create Employee</h2>
            <Form.Group controlId="firstName">
                <Form.Label>Employee First Name</Form.Label>
                <Form.Control required name="first_name" type="text" placeholder="Enter employee first name" onChange={updateFormData}/>
            </Form.Group>
            <Form.Group controlId="lastName">
                <Form.Label>Employee Last Name</Form.Label>
                <Form.Control required name="last_name" type="text" placeholder="Enter employee last name" onChange={updateFormData}/>
            </Form.Group>
            <Form.Group controlId="salary">
                <Form.Label>Salary</Form.Label>
                <Form.Control required name="salary" type="text" placeholder="Enter employee salary" onChange={updateFormData}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submit}>
                Submit
            </Button>
        </Form>
    </>;
}

export default CreateEmployee;