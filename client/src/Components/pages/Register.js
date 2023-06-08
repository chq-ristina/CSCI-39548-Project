import React from 'react'
import { Link } from 'react-router-dom'
import './Form.css';

function Register() {
  return (
    <div className='form-container'>
        <div className='form-wrapper'>
            <span className='title'><strong>Register</strong></span>
            <form>
                <input type='text' placeholder='First name'></input>
                <input type='text' placeholder='Last name'></input>
                <input type='email' placeholder='email'></input>
                <input type='password' placeholder='password'></input>
                <button>Sign Up</button>
            </form>
            <p>Have an account? <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register