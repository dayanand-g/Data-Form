import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Validation from './SignupValidation'

function Signup() {

    const [formData, setFormData] = useState({
        name: '',
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
        setErrors(Validation(formData));
        try {
                const response = await axios.post('http://localhost:8081/signup', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                navigate('/login')
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

  return (
    <div className='main'>
        <div className='inside'>
            <form action="" onSubmit={handleSubmit}>
                <div className='elements'>
                    <label htmlFor="Name"><strong>Name</strong></label>
                    <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Enter Your Name' />
                    {errors.name && <span className='error'>{errors.name}</span>}
                </div>
                <div className='elements'>
                    <label htmlFor="Email"><strong>Email</strong></label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter Your Email' />
                    {errors.email && <span className='error'>{errors.email}</span>}
                </div>
                <div className='elements'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" name='password' value={formData.password} onChange={handleChange} placeholder='Enter Your Password' />
                    {errors.password && <span className='error'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn1'>Sign Up</button>
                <p>If You Already Have An Account Please Login Below</p>
                <Link to="/login" className='btn2'>Log In</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup