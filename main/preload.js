const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  handleCount: (callback) => ipcRenderer.on('update-counter', callback),
  
  /** 取消监听 */
  removeListener: (names) => {

    // 数组为空移除所有监听
    if (!names.length) {
      ipcRenderer.removeAllListeners();
    } else {
      names.forEach(name => {
        ipcRenderer.removeAllListeners(name)
      })
    }

    return null
  }
})
