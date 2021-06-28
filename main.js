// 控制应用程序生命和创建原生浏览器窗口的模块 
const {app, BrowserWindow,Menu} = require('electron')
const path = require('path')

function createWindow () {
  Menu.setApplicationMenu(null)
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    icon: path.join(__dirname, './assets/favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // 并加载应用程序的 index.html。
  mainWindow.loadFile('index.html')

  // 打开开发者工具。
  // mainWindow.webContents.openDevTools() 
}

// 当 Electron 完成时将调用此方法
// 初始化并准备好创建浏览器窗口。
// 部分API只有在该事件发生后才能使用。
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当所有窗口关闭时退出，macOS 除外。 那里，很常见
// 使应用程序及其菜单栏保持活动状态直到用户退出
// 显式使用 Cmd + Q。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// 在此文件中，您可以包含应用程序特定主进程的其余部分
// 代码。 您也可以将它们放在单独的文件中并在此处要求它们。