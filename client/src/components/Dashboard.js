import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../contextProvider/Context'

const Dashboard = () => {
    const {logindata , setLoginData} = useContext(LoginContext)  //3:50:00
    // console.log(logindata.validUserOne.email)

    const history = useNavigate()
    
    const DashboardValid = async() => {

        let token = localStorage.getItem('usersdatatoken')
        // console.log(token)

        const res = fetch('/validUser' , {
            method: 'GET',
            headers: {
                "Content-Type" : "application/json",
                "Authorization": token
            }
        })
        const data = await res.json();
        // console.log(data)

        if(data.status === 401 || !data){

            history("*")
            
            
            
        }else{
            // console.log("user verified")
            setLoginData(data)
            history("/dash")
        }

    }

    useEffect(()=>{
        DashboardValid()
    },[])


    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img alt='img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6inOoN7E4JKJ1SPI2_bY8K9qkjdwkuQ_LAy1XoLlm8isNBYN15Mw2mFcmFqEnlzGbr3M&usqp=CAU' />
                <h1>Email: {logindata ? logindata?.validUserOne?.email : ""}</h1>
            </div>
        </>
    )
}

export default Dashboard
