import React, { useState } from 'react';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import uuidv4 from 'uuid/v4'
import SimpleMDE from 'react-simplemde-editor'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'easymde/dist/easymde.min.css'
import { flattenArr, objToArr } from './utils/helper'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import defaultFiles from './utils/defaultFiles'

function App() {

  const [files, setFiles] = useState(flattenArr(defaultFiles))
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFieldIDs] = useState([])
  const [unsavedFileIDs, setUnsanvedFileIDs] = useState([])
  const [searchedFiles, setSearchedFiles] = useState([])

  const filesArr = objToArr(files)

  const fileClick = id => {
    setActiveFileID(id)
    if (openedFileIDs.includes(id)) return
    setOpenedFieldIDs([...openedFileIDs, id])
  }

  const tabClick = id => {
    setActiveFileID(id)
  }

  const tabClose = id => {
    const tabsWithout = openedFileIDs.filter(fileId => fileId !== id)
    setOpenedFieldIDs(tabsWithout)
    tabsWithout.length > 0 ? setActiveFileID(tabsWithout[0]) : setActiveFileID('')
  }

  const fileChange = (id, value) => {
    const newFile = {...files[id], body: value}
    setFiles({...files, [id]: newFile})
    if (unsavedFileIDs.includes(id)) return
    setUnsanvedFileIDs([...unsavedFileIDs, id])
  }

  const deleteFile = id => {
    delete files[id]
    setFiles(files)
    tabClose(id)
  }

  const fileSearch = keyword => {
    const newFiles = filesArr.filter(file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }

  const createNewFile = () => {
    if (filesArr.find(file => file.isNew)) return
    const newID = uuidv4()
    const newFiles = {
      ...files,
      [newID]: {
        id: newID,
        title: '',
        body: '',
        createAt: new Date().getTime(),
        isNew: true
      }
    }
    setFiles(newFiles)
  }

  const updateFileName = (id, title) => {
    const modifiedFile = {
      ...files[id],
      title,
      isNew: false
    }
    const newFiles = { ...files, [id]: modifiedFile }
    setFiles(newFiles)
  }

  const openedFiles = openedFileIDs.map(id => files[id])
  const activeFile = files[activeFileID]
  const fileListArr = (searchedFiles.length > 0) ? searchedFiles : filesArr

  return (
    <div className="app container-fluid px-0">
      <div className="row main no-gutters">
        <div className="col-3 left-panel">
          <FileSearch
            title="My Cloud Documents"
            onFileSearch={val => fileSearch(val)}
          />
          <FileList
            files={fileListArr}
            onFileClick={id => fileClick(id)}
            onFileDelete={id => deleteFile(id)}
            onSaveEdit={(id, newValue) => updateFileName(id, newValue)}
          />
          <div className="row no-gutters button-group mt-3 px-3 mb-3">
            <div className="col">
              <BottomBtn
                text="New"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col ml-3">
              <BottomBtn
                text="Import"
                colorClass="btn-success"
                icon={faFileImport}
                onBtnClick={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="col-9 bg-light right-panel">
          {
            !activeFile && <div className="start-page">
              Select or create a Markdown documentation
            </div>
          }
          {
            activeFile && <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={id => tabClick(id)}
                onCloseTab={id => tabClose(id)}
              />
              <SimpleMDE
                key={activeFile && activeFileID}
                value={activeFile && activeFile.body}
                onChange={value => fileChange(activeFileID, value)}
                options={{
                  minHeight: '515px'
                }}
              />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
