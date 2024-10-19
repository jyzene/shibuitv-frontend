import React from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './features/home/HomePage'
import LibraryPage from './features/library/LibraryPage'
import SchedulePage from './features/schedule/SchedulePage'
import AdminLayout from './components/adminLayout/AdminLayout'
import LoginForm from './features/login/loginForm'
import Dashboard from './features/dashboard/Dashboard'
import CategoryForm from './features/forms/CategoryForm'
import TypeForm from './features/forms/TypeForm'
import HostForm from './features/forms/HostForm'
import UsersForm from './features/forms/UsersForm'
import FormLayout from './components/FormLayout/FormLayout'
import PostForm from './features/forms/PostForm'
import ProtectedRoute from './auth/ProtectedRoute'
import PostList from './features/Posts/PostList'
import PostDetail from './features/Posts/PostDetail'
//import { useAuth } from './auth'
import './App.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route path='/'>
      <Route path='home' element={<HomePage/>}></Route>
      <Route path='library' element={<LibraryPage/>}></Route>
      <Route path='schedule' element={<SchedulePage/>}></Route>
    </Route>

    <Route path='/admin' element={<AdminLayout/>}>
      <Route path='login' element={<LoginForm/>}/>

        <Route element={<ProtectedRoute/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='form' element={<FormLayout/>}/>
          <Route path='categories' element={<CategoryForm/>}/>
          <Route path='types' element={<TypeForm/>}/>
          <Route path='host' element={<HostForm/>}/>
          <Route path='users' element={<UsersForm/>}/>
          <Route path='Posts' element={<PostForm/>}/>
          <Route path='PostList' element={<PostList/>}/>
          <Route path='PostDetail/:id' element={<PostDetail/>}/>
        </Route>

    </Route>
  </Route>
))

function App() {

  return (
      <RouterProvider router={router} />
  )
}

export default App
