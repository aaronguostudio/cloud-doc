import React, { useState } from 'react';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import SimpleMDE from 'react-simplemde-editor'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'easymde/dist/easymde.min.css'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import TabList from './components/TabList'
import defaultFiles from './utils/defaultFiles'

function App() {

  const [files, setFiles] = useState(defaultFiles)
  const [activeFileID, setActiveFileID] = useState('')
  const [openedFileIDs, setOpenedFieldIDs] = useState([])
  const [unsavedFileIDs, setUnsanvedFileIDs] = useState([])
  const [searchedFiles, setSearchedFiles] = useState([])

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
    const newFiles = files.map(file => {
      if (file.id === id) file.body = value
      return file
    })
    setFiles(newFiles)
    if (unsavedFileIDs.includes(id)) return
    setUnsanvedFileIDs([...unsavedFileIDs, id])
  }

  const deleteFile = id => {
    const newFiles = files.filter(file => file.id !== id)
    setFiles(newFiles)
    tabClose(id)
  }

  const fileSearch = keyword => {
    const newFiles = files.filter(file => file.title.includes(keyword))
    setSearchedFiles(newFiles)
  }

  const updateFileName = (id, title) => {
    // const file = files.find(file => file.id === id)
    // file.title = title
    const newFiles = files.map(file => {
      if (file.id === id) file.title = title
      return file
    })
    setFiles(newFiles)
  }

  const openedFiles = openedFileIDs.map(id => files.find(file => file.id === id))
  const activeFile = files.find(file => file.id === activeFileID)

  const fileListArr = (searchedFiles.length > 0) ? searchedFiles : files

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
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={() => {}}
              />
            </div>
            <div className="col ml-3">
              <BottomBtn
                text="导入"
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
