import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  let node = useRef(null)

  const closeSearch = e => {
    e.preventDefault()
    setInputActive(false)
    setValue('')
  }

  useEffect(() => {
    const handleInputEvent = e => {
      if (!inputActive) return
      const { keyCode } = e
      if (keyCode === 13) {
        onFileSearch(value)
      } else if (keyCode === 27) {
        closeSearch(e)
      }
    }

    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
    }
  })

  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  })

  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center">
      {
        !inputActive &&
        <>
          <span>{ title }</span>
          <button
            className="icon-button ml-2"
            type="button"
            onClick={() => setInputActive(true)}
          >
            <FontAwesomeIcon
              title="Search"
              size="md"
              icon={faSearch}
            />
          </button>
        </>
      }
      {
        inputActive &&
        <>
          <input
            className="form-control"
            onChange={e => setValue(e.target.value)}
            ref={node}
            value={value}
          />
          <button
            className="icon-button ml-2"
            type="button"
            onClick={closeSearch}
          >
            <FontAwesomeIcon
              title="Close"
              size="md"
              icon={faTimes}
            />
          </button>
        </>
      }
    </div>
  )
}

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
}

FileSearch.defaultProps = {
  title: 'My Documents'
}

export default FileSearch
