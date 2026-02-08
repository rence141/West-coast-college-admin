import { useState, useCallback, useEffect } from 'react'
import { login as apiLogin, getStoredToken, setStoredToken, clearStoredToken, getProfile } from './lib/authApi'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [loginError, setLoginError] = useState<string | undefined>(undefined)
  const [signUpSuccess, setSignUpSuccess] = useState<string | undefined>(undefined)
  const [showSignUp, setShowSignUp] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    if (user || authChecked) return
    const token = getStoredToken()
    if (!token) {
      setAuthChecked(true)
      return
    }
    getProfile()
      .then((profile) => setUser({ username: profile.username }))
      .catch(() => clearStoredToken())
      .finally(() => setAuthChecked(true))
  }, [user, authChecked])

  const handleLogin = useCallback(async (username: string, password: string) => {
    setLoginError(undefined)
    setSignUpSuccess(undefined)
    setLoginLoading(true)
    try {
      const data = await apiLogin(username, password)
      setStoredToken(data.token)
      setUser({ username: data.username })
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Invalid username or password.')
    } finally {
      setLoginLoading(false)
    }
  }, [])

  const handleLogout = useCallback(() => {
    clearStoredToken()
    setUser(null)
    setLoginError(undefined)
  }, [])

  if (user) {
    return (
      <Dashboard
        username={user.username}
        onLogout={handleLogout}
        onProfileUpdated={(profile) => setUser({ username: profile.username })}
      />
    )
  }

  if (showSignUp) {
    return (
      <SignUp
        onSuccess={() => {
          setShowSignUp(false)
          setSignUpSuccess('Account created. Sign in with your new credentials.')
        }}
        onSwitchToLogin={() => setShowSignUp(false)}
      />
    )
  }

  return (
    <Login
      onLogin={handleLogin}
      error={loginError}
      signUpSuccess={signUpSuccess}
      onSwitchToSignUp={() => setShowSignUp(true)}
      loading={loginLoading}
    />
  )
}

export default App
