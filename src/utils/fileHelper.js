// use in nodejs

const fs = window.require('fs').promises

const fileHelper = {
  readFile: path => {
    return fs.readFile(path, { encoding: 'utf8' })
  },
  writeFile: (path, data) => {
    return fs.writeFile(path, data, { encoding: 'utf8' })
  },
  renameFile: (path, newPath) => {
    return fs.rename(path, newPath)
  },
  deleteFile: path => {
    return fs.unlink(path)
  }
}

export default fileHelper
