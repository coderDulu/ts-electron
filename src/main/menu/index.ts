import {app, Menu, Notification} from 'electron'
import { version, updateDate } from '../../../package.json'


const template: any = [
  {
    label: '关于',
    click: function() {
        const aboutNotify = new Notification({
          title: "关于",
          body: `当前版本：${version}\t\n更新日期：${updateDate}`
        })
        aboutNotify.show()
    },
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)