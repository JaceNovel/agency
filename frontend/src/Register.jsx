import React, { useState } from 'react'
import { sessionRegister } from './auth'

export default function Register({ onSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('STUDENT')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
      try {
      await sessionRegister({ name, email, password, role })
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md">
      <h2 className="text-lg font-bold mb-4">S'inscrire</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-2">
        <label>Nom</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
      </div>
      <div className="mb-2">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
      </div>
      <div className="mb-2">
        <label>Mot de passe</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" />
      </div>
      <div className="mb-2">
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="STUDENT">Student</option>
          <option value="STAFF">Staff</option>
        </select>
      </div>
      <button type="submit" className="mt-2 px-3 py-2 bg-green-600 text-white rounded">Créer</button>
    </form>
  )
}
