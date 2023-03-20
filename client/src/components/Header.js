import React, { useContext } from 'react'
import "./header.css"
import Avatar from "@mui/material/Avatar"
import { LoginContext } from '../contextProvider/Context'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const { logindata, setLoginData } = useContext(LoginContext)

    const history = useNavigate()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutuser = async () => {
        let token = localStorage.getItem('usersdatatoken')
        // console.log(token)

        const res = fetch('/logout', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        })
        const data = await (await res).json();
        // console.log(data)

        if (data.status === 201) {
            // console.log("user logout")
            localStorage.removeItem('usersdatatoken')
            setLoginData(false)
            history("/")
        } else {
            console.log("error")
            
        }
    }

    const goDash = () => {
        history("/dash")
    }

    const goError = () => {
        history("*")
    }

    return (
        <>
            <header>
                <nav><h1>Hp Cloud</h1>
                    <div className='avtar'>

                        {
                            (logindata.validUserOne) ? <Avatar onClick={handleClick} style={{ backgroundColor: 'salmon', fontWeight: "bold", textTransform: "capitalize" }}>{logindata.validUserOne.fname[0].toUpperCase()}</Avatar> :
                                <Avatar style={{ backgroundColor: 'blue' }} onClick={handleClick} />
                        }

                    </div>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {
                            logindata.validUserOne ? (
                                <div >
                                    <MenuItem onClick={() => {
                                        goDash();
                                        handleClick();
                                    }}>Profile</MenuItem>
                                    <MenuItem onClick={() => {
                                        logoutuser()
                                        handleClose()
                                    }}>Logout</MenuItem>
                                </div>
                            ) : (
                                <div >
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>

                                </div>
                            )
                        }


                    </Menu>
                </nav>
            </header>
        </>
    )
}

export default Header
