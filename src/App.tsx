import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { MainPage } from './pages/MainPage'
import { PostsPage } from './pages/PostsPage'
import { PostPage } from './pages/PostPage'
import { AddPostPage } from './pages/AddPostPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { UsersPage } from './pages/UsersPage'
import { Layout } from './components/Layout'
import { BackgroundAnimation } from './components/BackgroundAnimation'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<MainPage />} />
        <Route path={'posts'} element={<PostsPage />} />
        <Route path={'posts/:id'} element={<PostPage />} />
        <Route path={'new'} element={<AddPostPage />} />
        <Route path={'register'} element={<RegisterPage />} />
        <Route path={'login'} element={<LoginPage />} />
        <Route path={'profile/:username'} element={<ProfilePage />} />
        <Route path={'users'} element={<UsersPage />} />
      </Routes>

      <BackgroundAnimation />
      <ToastContainer />
    </Layout>
  )
}

export default App
