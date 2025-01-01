import React from 'react'
import Style from './Style.module.css'
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';



const Header = () => {


  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logout")
  }

  return (
    <div className={Style.Header}>
      <div className={Style.wrapper}>

        <div> </div>

        <div className={Style.items}>

          <div className={Style.item} onClick={() => navigate('/sign-in')}>
            <BiLogInCircle className={Style.icon} />
            <span>Login</span>
          </div>

          <div className={Style.item}>
            <BiLogOutCircle onClick={handleLogout} className={Style.icon} />
            <span>Logout</span>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Header