import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById, updateUserById } from '../services/api';
import toast from 'react-hot-toast';

const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        setFormData(res?.data?.user);
      } catch (err) {
        toast.error("Failed to fetch user.");
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserById(id, formData);
      if (response?.data?.success) {
        return toast.success(response?.data?.message);
      }
      else {
        return toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <form >
      <h2>Edit User</h2>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="username"
        className='border border-amber-300 m-2 p-2'
      />
      <br />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className='border border-amber-300 m-2 p-2'
      />
      <br />
      <button onClick={handleSubmit} className='bg-green-400 text-white rounded-sm p-3 ml-2'>Save</button>
    </form>
  );
};

export default EditUser;
