import React, { useState } from 'react'
import './Login.css'

type LoginProps = {
  onLogin: (username: string, password: string) => void
  error?: string
  signUpSuccess?: boolean
  loading?: boolean
}

export default function Login({ onLogin, error, signUpSuccess: _signUpSuccess, loading }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* LEFT SIDE: Hero / Content Area */}
        <div className="login-hero">
          <div className="hero-content">
            <img src="/Logo.jpg" alt="West Coast College" className="hero-logo" />
            <h2 className="hero-title">West Coast College</h2>
            <p className="hero-text">
              Staff Portal - Secure access for authorized personnel only.
              Please ensure you have proper credentials before attempting to login.
            </p>
            {/* You can easily edit or add more content here later */}
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="login-side">
          <div className="login-card">
            <h1 className="login-title">Sign In</h1>
            <p className="login-subtitle">Enter your credentials to continue</p>

            <form className="login-form" onSubmit={handleSubmit}>
              {error && <p className="login-error" role="alert">{error}</p>}
              
              <label className="login-label">
                Username
                <input
                  type="text"
                  className="login-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  required
                />
              </label>

              <label className="login-label">
                Password
                <input
                  type="password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  required
                />
              </label>

              <button type="submit" className="login-submit" disabled={loading}>
                {loading ? 'Authenticating…' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}