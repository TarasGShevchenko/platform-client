import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { MainPage } from './pages/MainPage'
import { PostPage } from './pages/PostPage'
import { AddPostPage } from './pages/AddPostPage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { UsersPage } from './pages/UsersPage'
import { Layout } from './components/Layout'
import { BackgroundAnimation } from './components/BackgroundAnimation'
import { Link } from './enums'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={Link.home} element={<MainPage />} />
        <Route path={`${Link.posts}/:id`} element={<PostPage />} />
        <Route path={Link.new} element={<AddPostPage />} />
        <Route path={Link.register} element={<RegisterPage />} />
        <Route path={Link.login} element={<LoginPage />} />
        <Route path={`${Link.profile}/:username`} element={<ProfilePage />} />
        <Route path={Link.users} element={<UsersPage />} />
      </Routes>
      <BackgroundAnimation />
      <ToastContainer />
    </Layout>
  )
}

export default App
