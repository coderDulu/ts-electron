const datagram = require('dgram');


function createUdpServer(port, addr, callback) {
  try {
    const socket = datagram.createSocket("udp4");
    socket.on('message', (msg, rinfo) => {
      callback && callback(msg, rinfo, socket);
    });


    socket.on('listening', () => {
      const address = socket.address();
      console.log("server listening:", address.address + ":" + address.port);
    });

    socket.on('close', () => {
      console.log('closed server!');
      socket.close();
    })

    socket.on('connect', () => {
      console.log('connected');
    })


    socket.bind(port, addr);
  } catch (error) {

  }
}

createUdpServer(10002, '127.0.0.1', (data, rinfo, socket) => {
  try {
    console.log('rx-data', data.toString());
    const command = JSON.parse(data.toString());
    handleReq(command);
  } catch (error) {

  }
  // const { address, port } = rinfo;
  // console.log(address, port);
  // socket.send('233', port, err => {
  //   if (err) return;
  //   console.log('send success');
  // })
})


function handleReq(command) {
  try {
    const { name, action } = command;
    console.log(name, action);
  } catch (error) {

  }
}