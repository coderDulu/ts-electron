var net = require('net');

function createServer(port) {
  var server = net.createServer(function (connection) {
    console.log('client connected');
    connection.on('end', function () {
      console.log('客户端关闭连接');
    });
    connection.write(`Hello World! ${port} \r\n`);
    connection.pipe(connection);
  });

  server.listen(port, function () {
    console.log('server is listening', port);
  });
}


createServer(10001);
