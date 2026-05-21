import React, { useState } from 'react'
import { sessionLogin } from './auth'

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
      try {
      await sessionLogin(email, password)
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md">
      <h2 className="text-lg font-bold mb-4">Se connecter</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-2">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
      </div>
      <div className="mb-2">
        <label>Mot de passe</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
      </div>
      <button type="submit" className="mt-2 px-3 py-2 bg-blue-600 text-white rounded">Connexion</button>
    </form>
  )
}
