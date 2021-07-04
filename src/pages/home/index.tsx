import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
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
    if (!token) {
      history.push('/login')
      return
    }

    async function checkToken() {
      try {
        console.log('running');

        const res = await axios.post('https://my-contact-api.herokuapp.com/validate-token', { token })

        localStorage.setItem('token', res.data.token._id)
        setToken(res.data.token._id)
      } catch (err) {
        alert(err.message)
        localStorage.setItem('token', '')
        history.push('/login')
      }
    }
    async function getContacts() {
      try {
        const res = await axios.post('https://my-contact-api.herokuapp.com/get-contacts', { token })
        setContacts(res.data)
      } catch (err) {
        alert(err.message)
      }
    }
    checkToken()
    getContacts()
  }, [])

  function deleteContact(index: number, id: string) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this contact data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post('https://my-contact-api.herokuapp.com/delete-contact', {
            id,
            token,
          })

          if(contacts.length > 1) {
            setContacts(contacts.splice(index, 1))
          }else {
            setContacts([])
          }

          Swal.fire(
            'Deleted!',
            'File has been successfully deleted.',
            'success'
          )
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Maybe you not have permission to delete it!',
          })
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your contact data is safe :)',
          'error'
        )
      }
    })
  }

  function logOut() {
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <div id="home">
      <h2>Home page</h2>
      <button onClick={() => logOut()}>Logout</button>
      <div className="contacts">
        {
          contacts.length > 0 ? (
            contacts.map((item, key) => (
              <div key={key} className="contact">
                <h3>{item.name}</h3>
                <small>Sent at: {new Date(item.createdAt).toLocaleString()}</small>
                <p>{item.message}</p>
                <div>
                  <button onClick={() => deleteContact(key, item._id)} className="contact-delete">Delete</button>
                  <a href={`mailto:${item.email}`} className="contact-replay">Reply</a>
                </div>
              </div>
            ))
          ) : (<span>You not have any contacts...</span>)
        }
      </div>
    </div>
  )
}