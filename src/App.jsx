import { useState ,useEffect,useContext} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Create from './Pages/Create.jsx'
import Signup from './Pages/Signup'
import View from './Pages/ViewPost.jsx'
import Post from './store/PostContext.jsx'
import {BrowserRouter as Router,Route ,Routes} from 'react-router-dom'

import {AuthContext, FirebaseContext} from './store/Context.jsx'
// import Signup from './Components/Signup/Signup'

function App() {
  // const [count, setCount] = useState(0)
  const {setUser}=useContext(AuthContext)
  const {auth}=useContext(FirebaseContext)
  console.log(setUser,auth);
  useEffect(()=>{
    
    auth.onAuthStateChanged((user)=>{
      console.log(user)
      setUser(user)
    })

  },[])

  return (
    <>
    <Post>
    <Router>
      <Routes>
      <Route path='/' Component={Home}/>
       
      <Route  path='/signup' Component={Signup} /> 
      <Route  path='/login' Component={Login} /> 
      <Route  path='/create' Component={Create} /> 
      <Route  path='/view' Component={View} />
      </Routes>
      </Router>
      </Post>
    </>
  )
}

export default App
