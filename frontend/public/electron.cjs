const { app, BrowserWindow } = require('electron')

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