import http from 'node:http';
import RequestsHandler from './RequestsHandler';
const server = http.createServer(
  (req, res) => {
    let requestBody = '';

    req.on('data', (chunk) => {
      requestBody += chunk;
    });

    req.on('end', async() => {
      RequestsHandler(req, res, requestBody)
    })
  }
)

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})