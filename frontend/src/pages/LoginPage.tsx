import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { canAccessPath, getDefaultPath } from '../auth/roles'
import { useAuth } from '../auth/useAuth'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { getApiErrorMessage } from '../utils/format'

type LocationState = {
  from?: {
    pathname?: string
  }
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { defaultPath, isAuthenticated, isLoading, loginWithCredentials } =
    useAuth()
  const state = location.state as LocationState | null
  const from = state?.from?.pathname || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isLoading) {
    return (
      <div className="auth-page">
        <Loading label="Chargement du compte..." />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={defaultPath} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const currentUser = await loginWithCredentials(email, password)
      const redirectTo = canAccessPath(currentUser.role, from)
        ? from
        : getDefaultPath(currentUser.role)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(getApiErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="login-card">
        <div className="login-brand">
          <span className="brand-mark">BC</span>
          <div>
            <strong>Bimik_Cafe</strong>
            <small>Caisse, stock et ventes</small>
          </div>
        </div>

        <div className="login-copy">
          <h1>Connexion</h1>
          <p>Connectez-vous pour gérer votre caisse.</p>
        </div>

        <form className="form-grid login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>

          <label>
            Password
            <input
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>

          <ErrorMessage message={error} />

          <button className="button login-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </section>
    </main>
  )
}
