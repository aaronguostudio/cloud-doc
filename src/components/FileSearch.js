import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import useKeyPress from '../hooks/useKeyPress'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const enterKeyPressed = useKeyPress(13)
  const escKeyPressed = useKeyPress(27)
  let node = useRef(null)

  const closeSearch = () => {
    setInputActive(false)
    setValue('')
    onFileSearch('')
  }

  useEffect(() => {
    if (!inputActive) return
    if (enterKeyPressed) onFileSearch(value)
    if (escKeyPressed) closeSearch()
  }, [inputActive, enterKeyPressed, escKeyPressed])

  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  }, [inputActive])

  return (
    <div className="alert d-flex justify-content-between align-items-center mb-0">
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
              size="1x"
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
              size="1x"
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
