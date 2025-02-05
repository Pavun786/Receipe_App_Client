import React, { useState } from 'react';
import "./styles/auth.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {API} from "../config.js"
export const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [_, setCookies] = useCookies(['access_token'])

    const navigate = useNavigate();

    const onSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                email,
                password
            });

            if (response.status === 200) {
               console.log(response.data)
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            window.localStorage.setItem("name", response.data.Uname);
            window.localStorage.setItem("token", response.data.token);
            navigate("/home");
            }
           
        } catch (error) {
            if (error.response.status === 404) {
                alert("The user doesn't exist");
            }
            else if (error.response.status === 401) {
                alert("Username or Password is incorrect");
            }   
        }
    }

  return (
    <div className='container'>
        <div className='login-form-container p-5'>
            <form onSubmit={onSubmit}>
                <h3 className='text-center'>Sign In</h3>

                <div className='mb-2'>
                    <label htmlFor="Email">Email</label>
                    <input 
                    type="text" 
                    placeholder='Enter Email-Id' 
                    className='form-control'
                    id='email'
                    onChange={(event) => setEmail(event.target.value)}/>
                </div>

                <div className='mb-2'>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    placeholder='Enter password' 
                    className='form-control'
                    id='password'
                    onChange={(event) => setPassword(event.target.value)}/>
                </div>

                <div className='mb-2'>
                    <input type="checkbox" className='custom-control custom-checkbox' id='check'/>
                    <label htmlFor="check" className='custom-input-label ms-2'>Remember me</label>
                </div>

                <div className='d-flex justify-content-center mt-2'>
                <button className='btn btn-primary w-100'>Sign in</button>
                </div>
                <p className='text-end mt-2'>
                    {/* Forgot <a href="#">Password?
                    </a>  */}
                    <Link to="/signup" className='ms-2'>Sign up</Link>
                </p>
            </form>
        </div>
       
    </div>
  )
}