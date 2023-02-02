const dbCache = new Map(); // 数据库缓存

interface store_configType {
  name: string;     // 对象仓库名(创建的表名称)
  keyPath?: string;  // 主键
  autoIncrement?: boolean; //  是否自动生成主键，如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键
}

class DB {
  db: IDBDatabase | undefined; // 数据库

  DB_NAME: string;
  DB_VERSION: number;
  STORE_CONFIG: any;
  current_name: string | undefined;

  constructor(DB_NAME: string, DB_VERSION: number, STORE_CONFIG: store_configType) {
    this.DB_NAME = DB_NAME;
    this.DB_VERSION = DB_VERSION;
    this.STORE_CONFIG = STORE_CONFIG;
    // this.open();
  }

  open(
    DB_NAME: string = this.DB_NAME,
    DB_VERSION: number = this.DB_VERSION,
    STORE_CONFIG: store_configType = this.STORE_CONFIG
  ) {
    return new Promise<IDBDatabase>(resolve => {

      const req = indexedDB.open(DB_NAME, DB_VERSION);
      const _this = this;

      req.onsuccess = function () {
        console.log(`${DB_NAME} openDB DONE`);
        _this.db = this.result;
        dbCache.set(DB_NAME, this.result); // 缓存
        resolve(_this.db);
      }

      req.onerror = function (evt: any) {
        console.error('openDB: ', evt.target.errorCode)
      }

      // 创建一个仓库
      req.onupgradeneeded = function () {
        console.log('onupgradeneeded');
        const { name, keyPath, autoIncrement } = STORE_CONFIG;
        _this.db = this.result;

        // 创建表
        if (!this.result.objectStoreNames.contains(name)) {
          _this.db.createObjectStore(name, {
            keyPath,
            autoIncrement
          })
        }
      }
    })
  }

  // 获取事务 -> 操作数据必须在事务内进行
  getObjectStore(store_name: string, mode: 'readonly' | 'readwrite' = "readwrite") {
    return new Promise<IDBObjectStore>(async resolve => {
      try {
        // 没有缓存则打开数据库
        let db = dbCache.get(this.DB_NAME);

        if (!db) {
          db = await this.open();
        }
        if (!db) return;
        const tx = db.transaction([store_name], mode);
        resolve(tx.objectStore(store_name));
      } catch (error) {
        console.log(error);
      }
    })
  }

  // 连接仓库
  collection(store_name: string, mode: 'readonly' | 'readwrite' = "readwrite") {
    this.current_name = store_name;
    this.getObjectStore(store_name, mode);
    return this;
  }

  handle<T>(type: 'get' | 'put' | 'getAll' | 'put' | 'clear' | 'add' | 'delete', data?: any) {
    return new Promise<T>((resolve) => {
      this.getObjectStore(this.current_name as string).then((res: any) => {
        try {

          // console.log(type);
          const request = data !== undefined ? res[type](data) : res[type]();
          request.onsuccess = (event: any) => {
            // console.log('type =>', type, event.target.result);
            resolve(event.target.result)
          }

          request.onerror = (event: any) => resolve(event);
        } catch (error) {
          console.log(error);
          resolve(null as T);
        }
      })
    })
  }

  // 修改数据
  put(data: any) {
    return this.handle('put', data);
  }

  add(data: any) {
    return this.handle('add', data);
  }

  // 获取数据
  get<T>(key: any) {
    return this.handle<T>('get', key);
  }

  delete(key: any) {
    return this.handle('delete', key);
  }

  // 清空store
  clear() {
    return this.handle('clear');
  }

  // 获取全部数据
  getAll() {
    return this.handle('getAll');
  }
}

/**
 * 设置聊天消息数据库
 * @param addr ip地址
 * @param port 端口号
 * @returns 
 */
export const setIndexedOfChat = (addr: any, port: string | number) => {
  return new DB(`${addr}_${port}`, 2, { name: 'store', keyPath: 'ip' }).collection('store')
}

export default DB;
