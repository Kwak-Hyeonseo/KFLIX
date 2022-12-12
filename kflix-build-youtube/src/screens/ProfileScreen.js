import React from 'react'
import "./ProfileScreen.css"
import Nav from './../Nav';
import { useSelector } from 'react-redux';
import { selectUser } from './../features/userSlice';
import { auth } from '../firebase';

function ProfileScreen() {
  const user = useSelector(selectUser)

  return (
    <div className='ProfileScreen'>
      <Nav />
      <div className='ProfileScreen__body'>
        <h1>Edit Profile</h1>
        <div className='ProfileScreen__info'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117'
            alt=''
          />
          <div className='ProfileScreen__details'>
            <h2>{user.email}</h2>
            <div className='ProfileScreen__plans'></div>
            <h3>Plans</h3>
            <button onClick={() => auth.signOut()} className='ProfileScreen__signOut'>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen