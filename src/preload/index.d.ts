export interface IElectronAPI {
  openDevTool: () => void,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}