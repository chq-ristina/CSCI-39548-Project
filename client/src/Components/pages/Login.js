import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css';
import './Form.css';

function Login() {
    return (
        <div className='form-container'>
            <div className='form-wrapper'>
                <span className='title'><strong>Login</strong></span>
                <form>
                    <input type='email' placeholder='email'></input>
                    <input type='password' placeholder='password'></input>
                    <button>Login</button>
                </form>
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login