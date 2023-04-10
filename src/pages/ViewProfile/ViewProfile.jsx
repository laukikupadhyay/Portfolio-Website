import React from 'react'
import NavBar from '../../components/navbar/Navbar'
import MyAccount from '../../components/MyAccount/MyAccount'

function ViewProfile({user}) {
  return (
    <div>
        <NavBar/>
        <MyAccount/>
    </div>
  )
}

export default ViewProfile