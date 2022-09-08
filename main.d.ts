export interface IElectronAPI {
  handleCount: (callback) => void;
  openFile: () => Promise;
  setTitle: (title) => void,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}