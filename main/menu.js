// 1. 导入electron中的Menu
import { Menu } from "electron";


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



export default function createMenu() {

  // 2.1 为template中事件添加this
  template.forEach(item => {
    item.click && (item.click = item.click.bind(this));

    item.submenu && item.submenu.forEach(sub => {
      sub.click && (sub.click = sub.click.bind(this));
    })
  })

  // 3. 从模板中创建菜单
  const myMenu = Menu.buildFromTemplate(template);

  // 4. 设置为应用程序菜单
  Menu.setApplicationMenu(myMenu);
}