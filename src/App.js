import React from 'react';
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import BottomBtn from './components/BottomBtn'
import defaultFiles from './utils/defaultFiles'

function App() {
  return (
    <div className="app container-fluid px-0">
      <div className="row main no-gutters">
        <div className="col-3 left-panel">
          <FileSearch
            title="My Cloud Documents"
            onFileSearch={val => console.log('>', val)}
          />
          <FileList
            files={defaultFiles}
            onFileClick={id => console.log('>', id)}
            onFileDelete={id => console.log('>', id)}
            onSaveEdit={(id, newValue) => console.log('>', id, newValue)}
          />
          <div className="row no-gutters button-group mt-3 px-3">
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
          <h1>This is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
