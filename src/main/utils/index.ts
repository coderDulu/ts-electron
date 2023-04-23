import { dialog } from "electron";
import fs from 'fs';
import path from 'path';

type propertiesType = "openDirectory" | "openFile" | "multiSelections" | "showHiddenFiles" | "createDirectory" | "promptToCreate" | "noResolveAliases" | "treatPackageAsDirectory" | "dontAddToRecent"


/**
 * 打开文件管理器窗口
 * @param {propertiesType} type 窗口类型
 * @returns 
 */
export async function showDialog(type: propertiesType) {
  // @ts-ignore
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: [type] });
  if (canceled) {
    return
  } else {
    return filePaths[0]
  }
}

/**
 * 保存文件
 * @param savePath 保存的路径
 * @param name 文件名
 * @param data 文件数据
 * @returns 
 */
export function saveFile(savePath: string, name: string, data: any) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(savePath, name), data, 'utf-8', err => {
      if (err) reject(err);
      resolve(true);
    })
  })
}

/**
 * 读取文件内容
 * @param filePath 文件路径
 * @returns 文件内容
 */
export function readFile(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}

