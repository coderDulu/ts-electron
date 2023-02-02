import { BrowserWindow, dialog, ipcMain, IpcMainEvent } from 'electron'
import { showDialog } from './utils';

// 渲染器进程 -> 主进程
const onEvent = {
  'set-title': (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title)
  },
  'counter-value': (event, value) => {
    console.log('main -> ', value);
  },
  'open-dev': (e: IpcMainEvent) => {
    if (e.sender.isDevToolsOpened()) {
      e.sender.closeDevTools();
    } else {
      e.sender.openDevTools();
    }
  }
}

// 双向
const onHandle = {
  'dialog:openFile': async () => {
    return showDialog();
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