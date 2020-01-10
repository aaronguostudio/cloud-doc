import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import FileSearch from './components/FileSearch'

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 bg-danger left-panel">
          <FileSearch
            title="My Cloud Documents"
            onFileSearch={val => console.log('>', val)}
          />
        </div>
        <div className="col-9 bg-primary right-panel">
          <h1>This is the right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
