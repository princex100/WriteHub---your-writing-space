import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import {Provider} from "react-redux"
import PostForm from './components/PostForm.jsx'
import Signup from './components/Signup.jsx'
import { createBrowserRouter, 
  createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import BlogEdit from './components/BlogEdit.jsx'
import Profile from './components/Profile.jsx'
import OAuthCallback from './components/Oauth.jsx'
import Oauth from './components/Oauth.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="" element={<Home/>}>
      
      </Route>
      <Route path="login" element={<Login/>}/>
      <Route path='posts/:id' element={<BlogEdit/>}/>

      <Route path="SignUp" element={<Signup/>}/>
      <Route path="AddPost" element={<PostForm/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="oauth" element={<Oauth/>}/>



    </Route>
  )
    
  )
createRoot(document.getElementById('root')).render(

 <Provider store={store}>
  <RouterProvider router={router}>
    
  </RouterProvider>

  </Provider> 
 

   
)
