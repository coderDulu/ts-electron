/**
 * main文件夹：
 *  client_tcp.ts => net连接
 *  listen.ts => 监听函数设置
 *  menu.js => 菜单管理
 *  preload.js => 预加载文件，用于沟通渲染进程与主进程
 */
import { app, BrowserWindow } from 'electron';
// import isDev from 'electron-is-dev';
import path from 'path';
import createMenu from './main/menu';
import listen from './main/listen';

// 定义变量
let mainWindow: BrowserWindow | null = null;
const isDev = !app.isPackaged;  // 当前运行是否为打包状态

// 新建窗口
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, './main/preload.js'),
      nodeIntegration: true,     //设置能在页面使用nodejs的API
      contextIsolation: true,   //开启上下文隔离，通过preload进行通信
    },
  })

  // 加载react
  // 打开开发者工具
  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    let startUrl = new URL(path.resolve(__dirname, './dist/index.html'));
    startUrl.protocol = 'file:';
    mainWindow.loadURL(startUrl.href);
  }

  // 自定义菜单
  createMenu.apply(mainWindow);

  // 关闭window时触发
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}

// 当electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(() => {
  // 添加监听
  listen();

  // 创建窗口
  createWindow();

})

// 所有窗口关闭时退出应用
app.on('window-all-closed', function () {
  // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
})


