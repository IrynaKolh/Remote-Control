import { httpServer } from './http_server/index.js';
import { WebSocket, WebSocketServer } from "ws";

const HTTP_PORT = 3000;
const WEBSOCKET_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const ws = new WebSocketServer({ port: WEBSOCKET_PORT });
ws.on('connection', (ws: WebSocket) => {
  console.log(`connected ws on port ${WEBSOCKET_PORT}`);
  ws.on('message',  (message: Buffer) => {
    console.log('received: %s', message.toString());
  });
});

process.on('SIGINT', () => {  
  console.log("Server stopped.");
  ws.close();
  httpServer.close();
  process.exit(0);
});