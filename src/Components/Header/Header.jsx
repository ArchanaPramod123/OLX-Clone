import React,{useContext} from 'react';


import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext,FirebaseContext } from '../../store/Context';
import {useNavigate} from 'react-router-dom'

function Header() {
  const {user}=useContext(AuthContext)
  const {auth}=useContext(FirebaseContext)
  const history=useNavigate()
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        {/* <div className="loginPage">
          <span  >{user?`Welcome ${user.displayName}`:'login'}</span>
          <hr />
          

        </div> */}
        {user ?
          <div className="loginPage">
            
            <span>{user.displayName}</span>
          </div> : <span style={{cursor:'pointer' , fontWeight:'bold', fontSize:'18px'}} onClick={() => history('/login')}>Login</span>
        }
        {user &&<span style={{ cursor: 'pointer' }} onClick={()=>{
          auth.signOut()
          history('/login')
        }}>Logout</span>}

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent" onClick={()=>history('/create')}>
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
