import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import password from '../assets/images/password.svg'
import email from '../assets/images/email.svg'



const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate()

    const submit = (data) => {
        console.log(data)
        axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
            .then(res => {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                navigate("/");
            })
            .catch(error => {
                if (error.response.status === 401) {
                    alert("credenciales incorrectas")
                }
                console.log(error.response.status)
            })
    }




    return (
        <div>
            <div className='login-container'>
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Text>
                            <p className='login-title'>Welcome! Enter your email and password to continue</p>
                            <div className='test-data-container'>
                                <p className='test-data-title'>Test Data</p>
                                <div>
                                    <img src={email} alt="" />
                                    <p>john@gmail.com</p>
                                </div>
                                <div>
                                    <img src={password} alt="" />
                                    <p>john1234</p>
                                </div>
                            </div>
                        </Form.Text>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            {...register("email")}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            {...register("password")}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

            </div>
        </div>
    );
};

export default Login;