import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './mix.css'

const Register = () => {

    const [passShow, setPassShow] = useState(false)
    const [cpassShow, setCPassShow] = useState(false)

    const [inpval, setInpval] = useState({
        fname: "",
        email:"",
        password:"",
        cpassword:"",
    })


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

    const addUserData = async (e) => {
        e.preventDefault()

        const {fname , email , password , cpassword} = inpval

        if(fname === ""){
            alert("please enter your name")
        }else if(email === ""){
            alert("please enter your email")
        }
        else if(!email.includes("@")){
            alert("please enter valid email")
        }else if(password === ""){
            alert("enter your password")
        }else if(password.length<6){
            alert("password must be 6 char")
        }else if(cpassword === ""){
            alert("enter confirm password")
        }else if(cpassword.length<6){
            alert("confirm password must be 6 char")
        }else if(password !== cpassword){
            alert("password and confirm password not match")
        }else{
            // console.log("user registration successfully done")

            const data = await fetch('/register' , {
                method: 'POST',
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    fname,email,password,cpassword
                })
            })

            // console.log(data)

            const res = await data.json();
            // console.log(res,"####")
            if(res.status===201){
                alert("user registration done")
                setInpval({...inpval,fname:"",email:"",password:"",cpassword:""})
            }
        }

    }

  return (
    <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Sign Up</h1>
                        <p style={{textAlign:'center'}}>We are glad that you will be using Project Cloud to manage <br />
                            your tasks! We hope that you will get like it.</p>
                    </div>
                    <form>
                        <div className='form_input'>
                            <label htmlFor='fname'>Email</label>
                            <input onChange={setVal} value={inpval.fname} type='text' name='fname' id='fname' placeholder='Enter Your First Name'></input>
                        </div>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input onChange={setVal} value={inpval.email} type='email' name='email' id='email' placeholder='Enter Your Email Address'></input>
                        </div>
                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two'>
                                <input onChange={setVal} value={inpval.password} type={!passShow ? "password" : "text"} name='password' id='password' placeholder='Enter Your Password'></input>
                                <div onClick={() => setPassShow(!passShow)} className='showpass'>
                                    {
                                        !passShow ? "Show" : "Hide"
                                    }
                                </div>
                            </div>
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Confirm Password</label>
                            <div className='two'>
                                <input onChange={setVal} value={inpval.cpassword} type={!cpassShow ? "password" : "text"} name='cpassword' id='cpassword' placeholder='Confirm Password'></input>
                                <div onClick={() => setCPassShow(!cpassShow)} className='showpass'>
                                    {
                                        !cpassShow ? "Show" : "Hide"
                                    }
                                </div>
                            </div>
                        </div>
                        <button onClick={addUserData} className='btn'>Sign Up</button>
                        <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
                    </form>
                </div>
            </section>
        </>
  )
}

export default Register
