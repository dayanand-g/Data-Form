import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import Validation from './HomeValidation'

function Home() {

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        age: '',
        dob: '',
        email: ''
    });

    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors(Validation(formData));
        try {
                const response = await axios.post('https://data-form-chi.vercel.app/home', formData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                alert('Form Successfully Submitted')
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

  return (
    <div className='main'>
      <h2>Data Saving Form</h2>
        <div className='inside'>
            <form action="" onSubmit={handleSubmit}>
                <div className='elements'>
                    <label htmlFor="Name"><strong>Name</strong></label>
                    <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder='Enter Your Name' />
                    {errors.name && <span className='error'>{errors.name}</span>}
                </div>
                <div className='elements'>
                    <label htmlFor="Surname"><strong>Surname</strong></label>
                    <input type="text" name='surname' value={formData.surname} onChange={handleChange} placeholder='Enter Your Surname' />
                    {errors.surname && <span className='error'>{errors.surname}</span>}
                </div>
                <div className='elements'>
                    <label htmlFor="Age"><strong>Age</strong></label>
                    <input type="number" name='age' value={formData.age} onChange={handleChange} placeholder='Enter Your Age' />
                    {errors.age && <span className='error'>{errors.age}</span>}
                </div>
                <div className='elements'>
                    <label htmlFor="DOB"><strong>DOB</strong></label>
                    <input type="date" name='dob' value={formData.dob} onChange={handleChange} placeholder='Enter Your DOB' />
                    {errors.dob && <span className='error'>{errors.dob}</span>}
                </div>
                <div className='elements'>
                    <label htmlFor="Email"><strong>Email</strong></label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter Your Email' />
                    {errors.email && <span className='error'>{errors.email}</span>}
                </div>
                <button type='submit' className='btn1'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Home