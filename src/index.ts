import { httpServer } from './http_server/index.js';
import { createWebSocketStream, WebSocket, WebSocketServer } from "ws";
import { mouseDown, mouseLeft, mouseRight, mouseUp } from './control/mouse.js';


const HTTP_PORT = 3000;
const WEBSOCKET_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const ws = new WebSocketServer({ port: WEBSOCKET_PORT });
ws.on('connection', (ws: WebSocket) => {
  console.log(`connected ws on port ${WEBSOCKET_PORT}`);
  
  const duplex = createWebSocketStream(ws, {encoding: 'utf8'});

  duplex.on('data', async (data) => {
    console.log(data);
    const [command, value1, value2] = data.split(' ');

    switch (command) {
      case 'mouse_up': {
        mouseUp(Number(value1));
        duplex.write(data);
        break;
      }
      case 'mouse_down': {
        mouseDown(Number(value1));
        duplex.write(data);
        break;
      }
      case 'mouse_left': {
         mouseLeft(Number(value1));
        duplex.write(data);
        break;
      }
      case 'mouse_right': { 
         mouseRight(Number(value1));
        duplex.write(data);
        break; 
      }
     
      default:
        console.log("Wrong command!!!")
        break;
    }
  });

  duplex.on('close', () => {
    console.log('websocket stream was closed');
  });

});

process.on('SIGINT', () => {  
  console.log("Server stopped.");
  ws.close();
  httpServer.close();
  process.exit(0);
});

