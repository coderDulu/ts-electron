export interface IElectronAPI {
  handleCount: (callback) => void;
  openFile: () => Promise;
  setTitle: (title) => void;

  /** 打开开发者工具 */
  openDev: () => void;
  // 取消监听
  removeListener: (names: string[]) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
