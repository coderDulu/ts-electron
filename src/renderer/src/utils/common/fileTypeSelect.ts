// 文件格式匹配表
const regex: any = {
  'mp4|avi|mkv|flv|mpe?g|wbem': "video",
  'mp3|wav|flac|wma': 'mp3',
  'docx?': 'word',
  'pdf': 'pdf',
  'ppt': 'ppt',
  'zip|tar|gz|rar': 'zip',
  'txt': 'txt'
}

/**
 * 获取文件对应的各式
 * @param name 文件名
 * @returns 文件格式
 */
export function fileTypeSelect(name: string): string {
  let fileType = '';
  // 1. 获取文件后缀
  const suffix = name.match(/\..*(\..*)?/);
  // 2. 匹配文件类型
  if (suffix) {
    Object.keys(regex).some(key => {
      const reg = new RegExp(key);
      if (reg.test(suffix[0])) {
        fileType = regex[key];
        return;
      }
    })
  }
  return fileType;
}