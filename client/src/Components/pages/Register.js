import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './Form.css';
import axios from 'axios';
import { setUser } from '../../Features/User';

function Register() {

    const history = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFName] = useState('');
    const [lname, setLName] = useState('');

    const [err, setErr] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [exists, setExists] = useState(false);

    async function submit(e){
        e.preventDefault();

        if(email === '' || password === '' || fname === '' || lname === ''){
            // alert("You must fill in all fields");
            setEmpty(true);
            if(exists) setExists(false);
            if(err) setErr(false);
            console.log("not signing up!");
            return;
        }
        
        console.log("signing up!");
        const user ={
            email: email,
            password: password,
            fname: fname,
            lname: lname
        }

        try{
            await axios.post("http://localhost:5000/register",user)
            .then(res => {
                if(res.data.msg === "exists"){
                    // alert("Account already exists")
                    setExists(true);
                    if(err) setErr(false);
                    if(empty) setEmpty(false);
                }else if(res.data.msg === "doesn't exist"){
                    dispatch(setUser({user_id: res.data.user_id, fname: res.data.fname}));
                    history("/")
                }
            })
            .catch(e =>{
                setErr(true);
                console.log(e);
            })
        }
        catch(e){
            setErr(true);
            console.log(e);
        }
    }

  return (
    <div className='form-container'>
        <div className='form-wrapper'>
            <span className='title'><strong>Register</strong></span>
            <form action='POST'>
                <input required type='text' onChange={(e) => setFName(e.target.value)} placeholder='First name'></input>
                <input required type='text' onChange={(e) => setLName(e.target.value)} placeholder='Last name'></input>
                <input required type='email' onChange={(e) => setEmail(e.target.value)} placeholder='email'></input>
                <input required type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password'></input>
                <button onClick={submit}>Sign Up</button>
                {err && <span className='error'>Something went wrong</span>}
                {empty && <span className='error'>You must fill in all fields</span>}
                {exists && <span className='error'>Account already exist</span>}
            </form>
            <p>Have an account? <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register