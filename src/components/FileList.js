import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import useKeyPress from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(null)
  const [value, setValue] = useState('')
  const enterKeyPressed = useKeyPress(13)
  const escKeyPressed = useKeyPress(27)
  const closeEdit = () => {
    setEditStatus(null)
    setValue('')
  }
  let node = useRef(null)

  useEffect(() => {
    const handleInputEvent = e => {
      if (editStatus === null) return
      if (enterKeyPressed) {
        const editItem = files.find(file => file.id === editStatus)
        onSaveEdit(editItem.id, value)
        closeEdit()
      }
      if (escKeyPressed) closeEdit()
    }

    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
    }
  })

  useEffect(() => {
    editStatus && node.current.focus()
  })

  return (
    <ul className="list-group list-group-flush file-list">
      {
        files.map(file => (
          <li
            className="list-group-item bg-light d-flex justify-content-between align-items-center file-item"
            key={file.id}
          >
            {
              file.id !== editStatus &&
                <>
                  <div>
                    <FontAwesomeIcon className="mr-2" size="1x" icon={faMarkdown} />
                    <span
                      className="c-link"
                      onClick={() => onFileClick(file.id)}
                    >{file.title}</span>
                  </div>
                  <div>
                    <button
                      className="icon-button ml-2 c-link"
                      type="button"
                      onClick={() => {
                        setEditStatus(file.id)
                        setValue(file.title)
                      }}
                    >
                      <FontAwesomeIcon
                        title="Edit"
                        size="1x"
                        icon={faEdit}
                      />
                    </button>
                    <button
                      className="icon-button ml-2"
                      type="button"
                      onClick={() => onFileDelete(file.id)}
                    >
                      <FontAwesomeIcon
                        title="Delete"
                        size="1x"
                        icon={faTrash}
                      />
                    </button>
                  </div>
                </>
            }
            {
              file.id === editStatus &&
              <>
                <input
                  className="form-control"
                  ref={node}
                  onChange={e => {
                    console.log('>>', e.target.value)
                    setValue(e.target.value)
                  }}
                  value={value}
                />
                <div>
                  <button
                    className="icon-button ml-2 c-link"
                    type="button"
                    onClick={closeEdit}
                  >
                    <FontAwesomeIcon
                      title="Close"
                      size="1x"
                      icon={faTimes}
                    />
                  </button>
                </div>
              </>
            }
          </li>
        ))
      }
    </ul>
  )
}

FileList.prototype = {
  files: PropTypes.array,
  onFileClick: PropTypes.func.isRequired,
  onSaveEdit: PropTypes.func.isRequired,
  onFileDelete: PropTypes.func.isRequired
}

export default FileList