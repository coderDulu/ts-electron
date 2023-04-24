/**
 * main文件夹：
 *  client_tcp.ts => net连接
 *  listen.ts => 监听函数设置
 *  menu => 菜单管理
 *  preload.js => 预加载文件，用于沟通渲染进程与主进程
 */
import { app, BrowserWindow } from 'electron';
import path from 'path';
import listen from './listen';
import './menu';

// 定义变量
let mainWindow: BrowserWindow | null = null;
const isDev = !app.isPackaged;  // 当前运行是否为打包状态
console.log('%c [ isDev ]-16', 'font-size:13px; background:pink; color:#bf2c9f;', isDev)

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS']="true"  // 关闭警告

// 新建窗口
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      nodeIntegration: false,     // 不允许在渲染进程中使用nodejs Api
      contextIsolation: true,     // 开启上下文隔离，通过preload进行通信
    },
    show: false,

  })

  // 加载react
  // 打开开发者工具
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    // 打开开发者工具
    mainWindow?.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }


  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })


  // 关闭window时触发
  mainWindow.on('closed', function () {
    mainWindow?.destroy();
    mainWindow = null;
  })
}

// 当electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
  // 创建窗口
  createWindow();

  // 添加监听
  listen();


  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 所有窗口关闭时退出应用
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.disableHardwareAcceleration(); // 禁用硬件加速
app.commandLine.appendSwitch('ignore-gpu-blacklist'); // 忽略 GPU 黑名单