const { app, BrowserWindow } = require('electron')

// attempt to create an executable using electron js
// unable to combine with backend since a cloud based
// database service was used

app.disableHardwareAcceleration();

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })

    win.loadURL('http://localhost:4000')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })