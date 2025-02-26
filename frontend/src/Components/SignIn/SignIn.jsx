import React from 'react'
import Style from './Style.module.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Instance from '../../Instance/axiosInstance'

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const LoginHandler = async (e) => {
        e.preventDefault();

        setError('');

        if (!email || !password) {
            setError('Please fill out both email and password.');
            return;
        }

        console.log(email, password, "data");

        try {
            const response = await Instance.post('/signin', {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                navigate('/dashboard');
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Login failed');
            } else {
                setError('An error occurred');
            }
            console.error('Login error:', err);
        }
    };



    return (
        <div className={Style.Container}>

            <div className={Style.center}>
                <div className={Style.loginWrap}>
                    <div className={Style.Title}>
                        <h3>Sign In</h3>
                    </div>
                    <div className={Style.formWrap}>
                        <form action="" onSubmit={(e) => { LoginHandler(e) }}>

                            <div className={Style.flex_column}>
                                <label>Email </label>
                            </div>
                            <div className={Style.inputForm}>
                                <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg"><g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                                <input type="text"
                                    placeholder='Email'
                                    required
                                    id="email"
                                    className={Style.input}
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>

                            <div className={Style.flex_column}>
                                <label>Password </label></div>
                            <div className={Style.inputForm}>
                                <svg height="20" viewBox="-64 0 512 512" width="20" xmlns="http://www.w3.org/2000/svg"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                                <input type="password"
                                    placeholder='Password'
                                    required
                                    id="password"
                                    className={Style.input}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />

                            </div>


                            <button className={Style.button_submit}> Sign In</button >
                            <p className={Style.p}>Don't have an account?
                                <Link to='/sign-up'><span className={Style.span}>Sign Up</span></Link>
                            </p>

                        </form >
                    </div >
                </div >
            </div >
        </div >
    )
}

export default SignIn