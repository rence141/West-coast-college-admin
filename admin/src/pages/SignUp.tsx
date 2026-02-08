import React, { useState } from 'react'
import { signUp } from '../lib/authApi'
import './SignUp.css'

type SignUpProps = {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

export default function SignUp({ onSuccess, onSwitchToLogin }: SignUpProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(undefined)

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    try {
      await signUp(username.trim(), password)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <img src="/logo.jpg" alt="West Coast College" className="signup-logo" />
        <h1 className="signup-title">West Coast College</h1>
        <p className="signup-subtitle">Create Admin Account</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          {error && <p className="signup-error" role="alert">{error}</p>}
          <label className="signup-label">
            Admin Username
            <input
              type="text"
              className="signup-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              autoComplete="username"
              required
            />
          </label>
          <label className="signup-label">
            Passcode
            <input
              type="password"
              className="signup-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </label>
          <label className="signup-label">
            Confirm Passcode
            <input
              type="password"
              className="signup-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter passcode"
              autoComplete="new-password"
              required
            />
          </label>
          <button type="submit" className="signup-submit" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{' '}
          <button type="button" className="signup-link" onClick={onSwitchToLogin}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
