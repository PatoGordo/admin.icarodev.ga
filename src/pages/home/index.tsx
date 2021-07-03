import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './home.scss'

type Contacts = {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  _id: string;
  __v: number;
  UID?: string;
}[]

export function Home() {
  const [contacts, setContacts] = useState<Contacts>([])
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const history = useHistory()

  useEffect(() => {
    if(!token) {
      history.push('/login')
      return
    }

    async function checkToken() {
      try {
        const res = await axios.post('https://my-contact-api.herokuapp.com/validate-token', {token})
  
        localStorage.setItem('token', res.data.token._id)
        setToken(res.data.token._id)
      }catch(err) {
        alert(err.message)
        localStorage.setItem('token', '')
        history.push('/login')
      }
    }
    checkToken()

    async function getContacts() {
      try {
        const res = await axios.post('https://my-contact-api.herokuapp.com/get-contacts', {token})
        setContacts(res.data)
      }catch(err) {
        alert(err.message)
      }
    }
    getContacts()
  }, [contacts, token])

  async function deleteContact(index: number, id: string) {

    try {
      await axios.post('https://my-contact-api.herokuapp.com/delete-contact', {
        id,
        token,
      })

      setContacts(contacts.splice(index, 1))
    }catch(err) {
      console.log(err);
    }

  }

  return (
    <div id="home">
      <h2>Home page</h2>
      
      <div>
        {
          contacts.map((item, key) => (
            <div key={key}>
              <h3>{item.name}</h3>
              <small>{new Date(item.createdAt).toLocaleString()}, {item.email}</small>
              <p>{item.message}</p>
              <button onClick={() => deleteContact(key, item._id)}>Delete</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}