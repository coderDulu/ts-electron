import { BrowserWindow, dialog, ipcMain } from 'electron'

// 渲染器进程 -> 主进程
const onEvent = {
  'set-title': (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title)
  },
  'counter-value': (event, value) => {
    console.log('main -> ', value);
  }
}

// 双向
const onHandle = {
  'dialog:openFile': async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog()
    if(canceled) {
      return
    } else {
      return filePaths[0]
    }
  },
  
}

export default function listen() {
  // 添加主进程监听
  Object.keys(onEvent).forEach(event => {
    ipcMain.on(event, onEvent[event]);
  })

  // 添加进程双向监听
  Object.keys(onHandle).forEach(event => {
    ipcMain.handle(event, onHandle[event]);
  })

}