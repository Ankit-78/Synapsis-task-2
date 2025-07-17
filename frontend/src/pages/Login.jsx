import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Form.css';

export function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success('✅ Logged in successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('❌ Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='split-form'>
      <div className='form-left'>
        <form className='form' onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type='email'
            placeholder='Email'
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type='submit'>Login</button>
        </form>
      </div>
      <div className='form-right'>
        <img
          src='https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg'
          alt='Login Illustration'
          className='form-img'
        />
      </div>
    </div>
  );
}
