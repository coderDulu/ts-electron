/**
 * 读取Blob对象的文本内容
 * @param blob Blob对象
 */
export function readerAsText<T>(blob: Blob, unicode: string = 'utf-8') {
  return new Promise<T>((resolve, reject) => {
    const reader = new FileReader();

    // 读取成功
    reader.onload = ev => resolve(ev.target?.result as T)

    // 读取失败
    reader.onerror = err => reject(err)

    // 开始读取
    reader.readAsText(blob, unicode);
  })
}

/**
 * File | Blob -> Base64
 * @param file Blob | File 对象
 * @returns 读取的base64链接
 */
export function readerAsDataUrl(file: File | Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 读取图片
    reader.addEventListener('load', () => {
      resolve(reader.result)
    }, false)

    if (file) {
      reader.readAsDataURL(file);
    }
  })
}

/**
 * Blob -> ArrayBuffer
 * @param file 
 * @returns 
 */
export function readerAsArrayBuffer(file: File | Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // 读取图片
    reader.addEventListener('load', () => {
      resolve(reader.result)
    }, false)

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  })
}


/**
 * URL.createObjectUrl() => 
 * File -> DOMString: File对象转换成URL
 * @param file File|Blob
 * @returns DOMString
 */
export function createObjectUrl(file: File | Blob) {
  const objectUrl = URL.createObjectURL(file);
  return objectUrl;
}


/**
 * 下载文件
 * @param file File对象
 */
export function downloadUrl(file: File) {
  if (file instanceof File) {
    const { name } = file;
    const url = createObjectUrl(file);
    const aEl = document.createElement('a')
    aEl.download = name;
    aEl.href = url;
    
    document.appendChild(aEl);
    aEl.click();
    document.removeChild(aEl);
  }
}