import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {FirebaseContext} from './store/Context.jsx'
import Context from './store/Context.jsx'
import firebaseApp from './firebase/config.js'
import { auth ,storage,firestore} from './firebase/config.js'
ReactDOM.createRoot(document.getElementById('root')).render(

    <FirebaseContext.Provider value={{firebaseApp,firestore, auth,storage}}>
      <Context>
    <App />
    </Context>
    </FirebaseContext.Provider>

)
