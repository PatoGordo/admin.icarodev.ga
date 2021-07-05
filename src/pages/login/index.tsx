import axios from 'axios'
import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import './login.scss'

export function Login() {
  const history = useHistory()
  const [token_, setToken] = useState(localStorage.getItem('token') || '')
  const [input, setInput] = useState('')

  useEffect(() => {
    if (token_) {
      history.push('/')
      return
    }
  }, [token_])

  async function validateToken(e: FormEvent) {
    e.preventDefault()

    try {
      const res = await axios.post('https://my-contact-api.herokuapp.com/contact/validate-token', {
        token: input
      })
      
      localStorage.setItem('token', res.data.token._id)
      history.push('/')
    }catch(err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This token does not exist',
      })
      setInput('')
    }
  }

  return (
    <div id="login">
      <h2>Token validation page</h2>

      <form onSubmit={validateToken}>
        <input type="text"
          placeholder="Your token"
          value={input}
          onChange={(e) => setInput(e.target.value.trim())}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
