import React, { useState } from 'react'
import './Login.css'

type LoginProps = {
  onLogin: (username: string, password: string) => void
  error?: string
  loading?: boolean
}

export default function RegistrarLogin({ onLogin, error, loading }: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <img src="/Logo.jpg" alt="West Coast College" className="login-logo" />
        <h1 className="login-title">West Coast College</h1>
        <p className="login-subtitle">Registrar Portal</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="login-error" role="alert">{error}</p>}
          <label className="login-label">
            Registrar Username
            <input
              type="text"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Registrar Username"
              autoComplete="username"
              required
            />
          </label>
          <label className="login-label">
            Credential Passcode
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              autoComplete="current-password"
              required
            />
          </label>
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Access Registrar Portal'}
          </button>
        </form>
      </div>
    </div>
  )
}
