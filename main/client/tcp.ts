import net from 'net'

interface configType {
  addr: string;
  port: number;
}

export const connectPoll = new Map<string, net.Socket>();

export default function client(config: configType, callback: (data: Buffer) => void) {
  return new Promise<net.Socket | null>((resolve) => {
    const poolItem = connectPoll.get(`${config.addr}_${config.port}`);
    if (poolItem) {
      resolve(poolItem);
    } else {
      console.log('create new tcp connect');
      // 连接客户端
      const instance = net.createConnection({
        port: config.port,
        host: config.addr
      });
      // 接受数据监听
      instance.on('data', (data: Buffer) => {
        callback(data);
      })
      // 连接错误监听
      instance.on('error', (error) => {
        console.log('error')
        resolve(null);
      })
      // 连接成功监听
      instance.on('connect', () => {
        console.log('success');
        connectPoll.set(`${config.addr}_${config.port}`, instance);
        resolve(instance);
      })
      // end监听
      instance.on('end', () => {
        console.log('end');
        resolve(null);
      })
      // 连接关闭监听
      instance.on('close', (reason) => {
        console.log('connect is closed', reason, config);
        // console.log('close', instance);
        connectPoll.delete(`${config.addr}_${config.port}`);
        resolve(null);
      })
    }

  })
}