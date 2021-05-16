import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {axiosInstance} from "../../reusable/axios";
import useFormData from "../../effects/Form/useFormData";
import FormInfo from "../../components/FormInfo/FormInfo";

function Register() {
    const [formInfo, setFormInfo] = useState(false);
    const [formDisplayed, setFormDisplayed] = useState(true);
    const {formData, updateFormData} = useFormData();

    const submit = (e) => {
        e.preventDefault();
        axiosInstance.post('/auth/register', formData).then((result) => {
            setFormInfo({
                type: 'primary',
                message: `Registration successful, ${result.data.first_name} ${result.data.last_name} you can now login.`,
            });
            setFormDisplayed(false);
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
        {
            !formDisplayed
            || <Form onSubmit={submit}>
                <Form.Group controlId="emailAddress">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required name="email" type="email" placeholder="Enter email"
                                  onChange={updateFormData}/>
                </Form.Group>
                <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required name="first_name" type="text" placeholder="Enter your First Name"
                                  onChange={updateFormData}/>
                </Form.Group>
                <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required name="last_name" type="text" placeholder="Enter your Last Name"
                                  onChange={updateFormData}/>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required name="password" type="password" placeholder="Password"
                                  onChange={updateFormData}/>
                </Form.Group>
                <Form.Group controlId="passwordAgain">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required name="password_confirmation" type="password" placeholder="Repeat Password"
                                  onChange={updateFormData}/>
                </Form.Group>
                <Button variant="primary" type="submit" on>
                    Submit
                </Button>
            </Form>
        }
    </>;
}

export default Register;