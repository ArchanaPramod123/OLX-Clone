import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
// import { firestore } from '../../firebase/config';
import { FirebaseContext,AuthContext } from '../../store/Context';
import {useNavigate} from 'react-router-dom'

const Create = () => {
  const history = useNavigate()
  const {storage,firestore}=useContext(FirebaseContext)
  const {user} =useContext(AuthContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState('')
  const date=new Date()
  const handleSubmit=()=>{
    // storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
    //   ref.getDownloadURL().then((url)=>{
    //     console.log(url);
    //   })
    // })
    const storageRef=storage.ref(`/image/${image.name}`)
    storageRef.put(image).then((snapshot)=>{
      storageRef.getDownloadURL().then((url)=>{
        console.log(url);
        firestore.collection('products').add({
          name:name,
          category:category,
          price:price,
          url:url,
          userId:user.uid,
          createdAt:date.toDateString()
        })
        history('/')
      })
    })

  }

  return (
    
    
    <Fragment>
      
      <div>
        <div className='headerr'><Header /></div>
      
      
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" value={price}
              onChange={(e)=>setPrice(e.target.value)} type="number" id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image? URL.createObjectURL(image):''}></img>
         
            <br />
            <input onChange={(e)=>{
              //multiple file we use with array
              setImage(e.target.files[0]
              )
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
      </div>
    </Fragment>
  );
};

export default Create;
