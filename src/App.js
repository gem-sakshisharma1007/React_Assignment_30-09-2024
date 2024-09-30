import React from 'react';
import { BrowserRouter , Route, Routes, Navigate } from 'react-router-dom';
import  Home  from './Components/Home';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Login />} />
      <Route path='/main'  element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
