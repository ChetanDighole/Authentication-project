import React, { useState } from 'react'
import './mix.css'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {

    const [passShow, setPassShow] = useState(false)

    const [inpval, setInpval] = useState({
        
        email:"",
        password:"",
        
    })

    const history = useNavigate()

    const setVal = (e) =>{
        const {name , value} = e.target;

        setInpval(()=>{
            //1:07:00 harsh pathak yt complete authentication
            return {
                ...inpval,
                [name]:value
            }
        })
    };

    const loginuser = async (e) => {
        e.preventDefault();

        const {email , password} = inpval;

        if(email === ""){
            alert("please enter your email")
        }
        else if(!email.includes("@")){
            alert("please enter valid email")
        }else if(password === ""){
            alert("enter your password")
        }else if(password.length<6){
            alert("password must be 6 char")
        }else{
            // console.log("user registration successfully done")
            const data = await fetch('/login' , {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    email,password
                })
            })

            const res = await data.json();
            console.log(res)
            if(res.status===201){
                localStorage.setItem('usersdatatoken' , res.result.token) //### 3:05 IMP imp
                history("/dash")
                setInpval({...inpval,email:"",password:""})
            }
        }

    }

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are glad you are back. Please login</p>
                    </div>
                    <form>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input value={inpval.email} onChange={setVal} type='email' name='email' id='email' placeholder='Enter Your Email Address'></input>
                        </div>
                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input value={inpval.password} onChange={setVal} type={!passShow ? "password" : "text"} name='password' id='password' placeholder='Enter Your Password'></input>
                                <div onClick={() => setPassShow(!passShow)} className='showpass'>
                                    {
                                        !passShow ? "Show" : "Hide"
                                    }
                                </div>
                            </div>
                        </div>
                        <button onClick={loginuser} className='btn'>Login</button>
                        <p>Don't have an account? <NavLink to="/register">Sign Up</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login