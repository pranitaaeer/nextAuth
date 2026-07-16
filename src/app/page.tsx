'use client'
import React from 'react'
import SignupPage from './components/user/signup/page'
import LoginPage from './components/user/signin/page'
import ForgotPassword from './components/user/forget-pass/page'
import ResetPassword from './components/user/reset-pass/page'
import VerifyEmail from './components/user/verifyemail/page'
import Dashboard from './components/profile/dashbaord/page'

export default function page() {
  return (
    <div>
      
      <Dashboard />
    </div>
  )
}
