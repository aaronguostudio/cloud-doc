const { app, BrowserWindow, Menu } = require('electron')
const isDev = require('electron-is-dev')
const menuTemplate = require('./src/menuTemplate')
let mainWindow

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })

  const url = isDev ? 'http://localhost:3000' : 'dummyurl'
  mainWindow.loadURL(url)

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
})
