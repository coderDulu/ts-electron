/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main/listen.js":
/*!************************!*\
  !*** ./main/listen.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listen)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);


// 渲染器进程 -> 主进程
const onEvent = {
  'set-title': (event, title) => {
    const webContents = event.sender;
    const win = electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow.fromWebContents(webContents);
    win.setTitle(title)
  },
  'counter-value': (event, value) => {
    console.log('main -> ', value);
  }
}

// 双向
const onHandle = {
  'dialog:openFile': async () => {
    const { canceled, filePaths } = await electron__WEBPACK_IMPORTED_MODULE_0__.dialog.showOpenDialog()
    if(canceled) {
      return
    } else {
      return filePaths[0]
    }
  },
  
}

function listen() {
  // 添加主进程监听
  Object.keys(onEvent).forEach(event => {
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.on(event, onEvent[event]);
  })

  // 添加进程双向监听
  Object.keys(onHandle).forEach(event => {
    electron__WEBPACK_IMPORTED_MODULE_0__.ipcMain.handle(event, onHandle[event]);
  })

}

/***/ }),

/***/ "./main/menu.js":
/*!**********************!*\
  !*** ./main/menu.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMenu)
/* harmony export */ });
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
// 1. 导入electron中的Menu



// 2. 创建菜单模板，数组中的每一个对象都是一个菜单
const template = [
  {
    label: '菜单一',
    submenu: [
      {
        label: '子菜单一',
        // 添加快捷键
        accelerator: 'ctrl+n',
        click: function () {
          this.webContents && this.webContents.openDevTools();
        }
      },
      {
        label: '子菜单二', 
        click: function () {
          this.webContents && this.webContents.send("update-counter", 1);
        }
      },
      { label: '子菜单三' },
    ]
  },
  {
    label: '菜单二',
    submenu: [
      { label: '子菜单一' },
      { label: '子菜单二' },
      { label: '子菜单三' },
      { label: '子菜单四' },
    ]
  }
]



function createMenu() {

  // 2.1 为template中事件添加this
  template.forEach(item => {
    item.click && (item.click = item.click.bind(this));

    item.submenu && item.submenu.forEach(sub => {
      sub.click && (sub.click = sub.click.bind(this));
    })
  })

  // 3. 从模板中创建菜单
  const myMenu = electron__WEBPACK_IMPORTED_MODULE_0__.Menu.buildFromTemplate(template);

  // 4. 设置为应用程序菜单
  electron__WEBPACK_IMPORTED_MODULE_0__.Menu.setApplicationMenu(myMenu);
}

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "electron-is-dev":
/*!**********************************!*\
  !*** external "electron-is-dev" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("electron-is-dev");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************!*\
  !*** ./main.ts ***!
  \*****************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! electron */ "electron");
/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var electron_is_dev__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron-is-dev */ "electron-is-dev");
/* harmony import */ var electron_is_dev__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(electron_is_dev__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _main_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main/menu */ "./main/menu.js");
/* harmony import */ var _main_listen__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main/listen */ "./main/listen.js");





// 定义变量
var mainWindow = null;
// 新建窗口
function createWindow() {
    mainWindow = new electron__WEBPACK_IMPORTED_MODULE_0__.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path__WEBPACK_IMPORTED_MODULE_2___default().join(__dirname, './main/preload.js'),
            nodeIntegration: true,
            contextIsolation: true, //开启上下文隔离，通过preload进行通信
        },
    });
    // 加载react
    // 打开开发者工具
    if ((electron_is_dev__WEBPACK_IMPORTED_MODULE_1___default())) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    }
    else {
        var startUrl = new URL(path__WEBPACK_IMPORTED_MODULE_2___default().resolve(__dirname, './build/index.html'));
        startUrl.protocol = 'file:';
        mainWindow.loadURL(startUrl.href);
    }
    // 自定义菜单
    _main_menu__WEBPACK_IMPORTED_MODULE_3__["default"].apply(mainWindow);
    // 关闭window时触发
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
// 当electron完成初始化并准备创建浏览器窗口时调用此方法
electron__WEBPACK_IMPORTED_MODULE_0__.app.whenReady().then(function () {
    // 添加监听
    (0,_main_listen__WEBPACK_IMPORTED_MODULE_4__["default"])();
    // 创建窗口
    createWindow();
});
// 所有窗口关闭时退出应用
electron__WEBPACK_IMPORTED_MODULE_0__.app.on('window-all-closed', function () {
    // macOS中除非用户按下 `Cmd + Q` 显式退出,否则应用与菜单栏始终处于活动状态.
    if (process.platform !== 'darwin') {
        electron__WEBPACK_IMPORTED_MODULE_0__.app.quit();
    }
});
electron__WEBPACK_IMPORTED_MODULE_0__.app.on('activate', function () {
    // macOS中点击Dock图标时没有已打开的其余应用窗口时,则通常在应用中重建一个窗口
    if (mainWindow === null) {
        createWindow();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map