import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App () {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: '',
    type: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    // console.log('hello from submit')

    if (!name) {
      //display alert
      // setAlert({ show: true, msg: 'please enter a name', type: 'danger' })
      showAlert(true, 'danger', 'please enter a value')
    } else if (name && isEditing) {
      setList(
        list.map(item => {
          if (item.id === editID) {
            return { ...item, title: name }
          }

          return item
        })
      )
      //deal with editing
      setName('')
      setIsEditing(false)
      setEditID(null)
      showAlert(true, 'success', 'value changed')
    } else {
      //show alert

      showAlert(true, 'success', 'item added successfully')

      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      setName('')
    }
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')

    setList([])
  }

  const removeItem = id => {
    showAlert(true, 'danger', 'item removed successfully')

    const newListValue = list.filter(item => item.id !== id)
    setList(newListValue)
  }

  const editItem = id => {
    showAlert(true, 'danger', 'item removed successfully')

    const singleItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(singleItem.title)
  }

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3>grocery bud</h3>

        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g eggs'
            value={name}
            onChange={e => setName(e.target.value)}
          />

          {console.log(name)}
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className='grocery-container '>
          <List items={list} removeListItem={removeItem} editItem={editItem} />

          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
