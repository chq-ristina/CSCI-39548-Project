import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Form.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../Features/User';

function Login() {

    const history= useNavigate();

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const [err, setErr] = useState(false);

    async function submit(e){
        e.preventDefault();

        if(email === '' || password === ''){
            alert("You must fill in all fields");
            console.log("not logging in!");
            return;
        }
        
        console.log("logging in!");
        const user ={
            email: email,
            password: password,
        }

        try{
            await axios.post("http://localhost:5000/login", user)
            .then(res => {
                if(res.data.msg === "exists"){
                    dispatch(setUser({user_id: res.data.user_id, fname: res.data.fname}))
                    history("/")
                }else if(res.data.msg === "wrong email"){
                    alert("Wrong email");
                }else if(res.data.msg === "wrong password"){
                    alert("Wrong password");
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

    // console.log(useSelector((state) => state.fname.value));
    // const user_fname = useSelector((state) => state.user.value.fname)
    // console.log(user_fname);

    return (
        <div className='form-container'>
            <div className='form-wrapper'>
                <span className='title'><strong>Login</strong></span>
                <form action='POST'>
                    <input required type='email' onChange={(e) => setEmail(e.target.value)} placeholder='email'></input>
                    <input required type='password' onChange={(e) => setPassword(e.target.value)} placeholder='password'></input>
                    <button onClick={submit}>Login</button>
                    {err && <span className='error'>Something went wrong</span>}
                </form>
                <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
            </div>
        </div>
    )
}

export default Login