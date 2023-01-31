export interface IElectronAPI {
  handleCount: (callback) => void;
  openFile: () => Promise;
  setTitle: (title) => void;
  // 取消监听
  removeListener: (names: string[]) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
