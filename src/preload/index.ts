import { contextBridge, ipcRenderer } from 'electron'
contextBridge.exposeInMainWorld('electronAPI', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),


  /** 打开开发者工具 */
  openDevTool: () => ipcRenderer.send('open-dev'),
  /** 取消监听 */
  removeListener: (names: string[]) => {
    // 数组为空移除所有监听
    if (names.length) {
      names.forEach(name => {
        ipcRenderer.removeAllListeners(name)
      })
    }
    return null
  }
})


