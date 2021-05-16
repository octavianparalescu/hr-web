import React, {useState} from 'react';
import useFormData from "../../../effects/Form/useFormData";
import useAuthentication from "../../../effects/Auth/useAuthentication";
import {axiosInstance} from "../../../reusable/axios";
import FormInfo from "../../FormInfo/FormInfo";
import {Button, Form} from "react-bootstrap";

function CreateDepartment({addDepartmentFn}) {
    const [formInfo, setFormInfo] = useState(false);
    const {formData, updateFormData} = useFormData();
    const auth = useAuthentication();

    const submit = (e) => {
        e.preventDefault();
        axiosInstance.put('/department', formData, {headers: auth.authHeaders}).then((result) => {
            addDepartmentFn(result.data);
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
            <h2>Create Department</h2>
            <Form.Group controlId="departmentName">
                <Form.Label>Department Name</Form.Label>
                <Form.Control required name="name" type="text" placeholder="Enter department name" onChange={updateFormData}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submit}>
                Submit
            </Button>
        </Form>
    </>;
}

export default CreateDepartment;