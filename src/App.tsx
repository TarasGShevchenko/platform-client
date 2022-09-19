import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

import { Layout } from './components/Layout'
import { MainPage } from './pages/MainPage'
import { PostsPage } from './pages/PostsPage'
import { PostPage } from './pages/PostPage'
import { EditPostPage } from './pages/EditPostPage'
import { AddPostPage } from './pages/AddPostPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
// import { getMeRequest } from './store/actions'
import { ProfilePage } from './pages/ProfilePage'
import { UsersPage } from './pages/UsersPage'

function App() {
  const dispatch = useDispatch()
  const token = window.localStorage.getItem('token')
  useEffect(() => {
    // token && dispatch(getMeRequest())
  }, [dispatch, token])
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={'posts'} element={<PostsPage />} />
        <Route path={'posts/:id'} element={<PostPage />} />
        <Route path={'posts/:id/edit'} element={<EditPostPage />} />
        <Route path={'new'} element={<AddPostPage />} />
        <Route path={'register'} element={<RegisterPage />} />
        <Route path={'login'} element={<LoginPage />} />
        <Route path={'profile'} element={<ProfilePage />} />
        <Route path={'users'} element={<UsersPage />} />
      </Routes>

      <ToastContainer />
    </Layout>
  )
}

export default App
