/**
 * main文件夹：
 *  client_tcp.ts => net连接
 *  listen.ts => 监听函数设置
 *  menu.js => 菜单管理
 *  preload.js => 预加载文件，用于沟通渲染进程与主进程
 */
import { app, BrowserWindow } from 'electron';
import path from 'path';
import listen from './listen';
import { config } from 'dotenv';
const env = config({ path: `${process.cwd()}/.env.development` }).parsed; // 读取.env配置文件

// 定义变量
let mainWindow: BrowserWindow | null = null;
const isDev = !app.isPackaged;  // 当前运行是否为打包状态



// 新建窗口
async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      nodeIntegration: false,     // 不允许在渲染进程中使用nodejs Api
      contextIsolation: true,     // 开启上下文隔离，通过preload进行通信
    },
    show: false
  })

  // 加载react
  // 打开开发者工具
  if (isDev) {
    mainWindow.loadURL(env ? env.VITE_APP_URL : "http://localhost:5173");
    // 打开开发者工具
    mainWindow?.webContents.openDevTools();
  } else {
    console.log(path.join(__dirname, '../renderer/index.html'));
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

