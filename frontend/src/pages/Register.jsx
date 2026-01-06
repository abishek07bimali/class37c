import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {createUserApi}  from "../services/api"
import {Button} from './components/Elements'
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }

    if (!formData.email) {
      toast.error('Email is required');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Invalid email format');
      return false;
    }

    if (!formData.password) {
      toast.error('Password is required');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    return true;
  };

  // API call
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const dataToSubmit = {
        username: formData.name, 
        email: formData.email,
        password: formData.password,
      };
      const response=await createUserApi(dataToSubmit) 
      if (response.data.success){
        toast.success(response?.data?.message)
      }
      else{
        toast.error(response?.data?.message)
      }

    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className='border border-amber-300 m-2 p-2'
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className='border border-amber-300 m-2 p-2'
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className='border border-amber-300 m-2 p-2'
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        className='border border-amber-300 m-2 p-2'
      />
      {/* <button onClick={handleSubmit}>register</button> */}

      <Button label={"register"} onclick={handleSubmit}/>

    </div>
  );
};

export default Register;
