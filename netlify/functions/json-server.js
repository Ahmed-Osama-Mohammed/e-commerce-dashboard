const jsonServer = require('json-server');
const path = require('path'); // Handle file paths
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../../../db.json')); // Path to db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

exports.handler = async (event, context) => {
  return new Promise((resolve) => {
    server.listen(3000, () => {
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: 'JSON Server is running!' }),
      });
    });
  });
};
