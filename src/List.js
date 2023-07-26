import React from 'react'
import { FaEdit, FaTrash, FaRemoveFormat } from 'react-icons/fa'
const List = ({ items, removeListItem, editItem }) => {
  return (
    <div>
      {items.map(item => {
        const { id, title } = item
        return (
          <article key={id} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                type='button'
                className='edit-btn'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>

              <button
                type='button'
                className='delete-btn'
                onClick={() => removeListItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List
