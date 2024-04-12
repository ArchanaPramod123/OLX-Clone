import React ,{useState,useEffect,useContext}from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import {useNavigate} from 'react-router-dom'
import { FirebaseContext } from '../../store/Context';
import { collection ,getDocs } from '../../firebase/config';
import  {PostContext}  from '../../store/PostContext';

function Posts() {
  const{firestore }=useContext(FirebaseContext)
  const [products,setProducts]=useState([])
  const {setPostDetails}=useContext(PostContext)
  const history=useNavigate()
  useEffect(()=>{
    const fetch = async () => {
      const snapshot = await getDocs(collection(firestore, 'products'));
      const allPost=snapshot.docs.map((product)=> ({
          id:product.id,
          ...product.data(),        
    }))
    setProducts(allPost)
  }
  console.log(products);

  fetch()
    
      // console.log(allPost)
      
  },[])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product)=>(

            <div
            className="card" onClick={()=>{
              setPostDetails(product)
              history('/view')

            }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}</span>
            </div>
            </div>

          ))
            }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

        {products.map((product)=>(
          <div className="card">
          <div className="favorite">
            <Heart></Heart>
          </div>
          <div className="image">
            <img src={product.url}  alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; {product.price}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name">{product.name}</p>
          </div>
          <div className="date">
            <span>{product.createdAt}</span>
          </div>
        </div>

      ))
      }
          
        </div>
      </div>
    </div>
  );
}

export default Posts;
