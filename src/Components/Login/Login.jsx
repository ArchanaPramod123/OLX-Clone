import React, { useState ,useContext} from 'react';
// import { FirebaseContext } from '../../store/Context'; 
import { FirebaseContext } from '../../store/Context';
import {Link} from 'react-router-dom'
import { auth , signInWithEmailAndPassword, firestore } from '../../firebase/config';
import {useNavigate} from 'react-router-dom'


import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errorMessage, setErrorMessage]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const history=useNavigate()
  const handleLogin=async (e)=>{
    e.preventDefault();
    // firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
    //   alert("Logged")
    // }).catch((error)=>{
    //   alert("error.message")
    // })
    try{
      const result = await signInWithEmailAndPassword(auth,email,password)
      setErrorMessage('')
      alert("login sucessfully")
      history('/')
    }catch(error){
      setErrorMessage(error.message)
    }
   

  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        {/* <a onClick={()=>useNavigate('/signup')}>Signup</a> */}
        <Link to='/signup'>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
