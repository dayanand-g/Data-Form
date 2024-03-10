import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import validation from './LoginValidation';
import axios from 'axios';

function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(validation(formData));
        try {
                const response = await axios.post('http://localhost:8081/login', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data,'res------------');
                if(response.data === "Success") {
                    navigate('/home')   
                } else {
                    alert("Record Not Found")
                }
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };


  return (
    <div className='main'>
        <div className='inside'>
            <form action="" onSubmit={handleSubmit}>
                <div className='elements'>
                    <label htmlFor="Email"><strong>Email</strong></label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter Your Email' />
                    {errors.email && <span className='error'>{errors.email}</span>}
                </div>
                <div className='elements'>
                    <label htmlFor="Password"><strong>password</strong></label>
                    <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Enter Your Password' />
                    {errors.password && <span className='error'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn1'>Log In</button>
                <p>If You Don't Have An Account Create Below</p>
                <Link to="/" className='btn2'>Sign Up</Link>
            </form>
        </div>
    </div>
  )
}   

export default Login