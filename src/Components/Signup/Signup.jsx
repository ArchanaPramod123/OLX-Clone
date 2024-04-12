import React, { useState,useContext } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { auth , createUserWithEmailAndPassword, firestore } from '../../firebase/config';
import {useNavigate,Link} from 'react-router-dom'



export default function Signup() {
  const history = useNavigate()
  const [Username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  //use fire base deconstuct
  const {firebase}=useContext(FirebaseContext)
  const handleSubmit= async (e)=>{
    //dont reload
    e.preventDefault()
    setError('')
    try{
      if (Username.trim()===''||email.trim()===''||phone.trim()===''||password.trim()===''){
        return setError("Plese fill the field")
      }

    // }
    // console.log(firebase)
    const result = await auth.createUserWithEmailAndPassword(email,password)
    
    const user = result.user
      await user.updateProfile({displayName:Username})
      await firestore.collection('users').add({
      id:user.uid,
      username:Username,
      phone:phone,


     })
     history('/login')
    
  }catch(error){
    switch(error.code){
      case 'auth/email-already-in-use':
          setError('The email address is already in use');
          break;
      case 'auth/invalid-email':
        setError("the email address is not valid")
        break;
      case 'auth/weak-password':
        setError("Input a strong password")
        break;
        default:
          setError('An error occurred while signing up. Please try again later');

    }
  }

  }
  if (error){
    setTimeout(()=>{
      setError('')
    },3000)
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        {error && <div className='error'><span>{error}</span></div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={Username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="number"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        {/* <a>Login</a> */}
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}
