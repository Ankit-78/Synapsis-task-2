import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../styles/Form.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      toast.success('✅ Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className='split-form'>
      <div className='form-left'>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            placeholder='First Name'
            onChange={e => setForm({ ...form, firstName: e.target.value })}
            required
          />
          <input
            placeholder='Last Name'
            onChange={e => setForm({ ...form, lastName: e.target.value })}
            required
          />
          <input
            placeholder='Email'
            type='email'
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            placeholder='Password'
            type='password'
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type='submit'>Register</button>
        </form>
      </div>
      <div className='form-right'>
        <img
          src="https://img.freepik.com/free-vector/sign-concept-illustration_114360-5425.jpg"
          alt="Register Illustration"
          className="form-img"
        />
      </div>
    </div>
  );
}
