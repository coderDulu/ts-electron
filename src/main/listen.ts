import { BrowserWindow, ipcMain, IpcMainEvent } from 'electron'
import { showDialog } from './utils';

// 渲染器进程 -> 主进程
const onEvent: any = {
  'open-dev': (e: IpcMainEvent) => {
    if (e.sender.isDevToolsOpened()) {
      e.sender.closeDevTools();
    } else {
      e.sender.openDevTools();
    }
  }
}

// 双向
const onHandle: any = {
  'dialog:openFile': async () => {
    return showDialog("openDirectory");
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