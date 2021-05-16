import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import useFormData from "../../effects/Form/useFormData";
import {axiosInstance} from "../../reusable/axios";
import FormInfo from "../../components/FormInfo/FormInfo";
import {LOGIN_REDIRECT} from "../../reusable/constants";
import useAuthentication from "../../effects/Auth/useAuthentication";

function Login() {
    const [formInfo, setFormInfo] = useState(false);
    const {formData, updateFormData} = useFormData();
    const auth = useAuthentication();

    const submit = (e) => {
        e.preventDefault();
        axiosInstance.post('/auth/login', formData).then((result) => {
            auth.setAuthToken(result.data.token);
            window.location.href = LOGIN_REDIRECT;
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
            <Form.Group controlId="emailAddress">
                <Form.Label>Email address</Form.Label>
                <Form.Control required name="email" type="email" placeholder="Enter email" onChange={updateFormData}/>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required name="password" type="password" placeholder="Password"
                              onChange={updateFormData}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submit}>
                Submit
            </Button>
        </Form>
    </>;
}

export default Login;