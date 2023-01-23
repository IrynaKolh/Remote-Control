import { httpServer } from './http_server/index';
import { createWebSocketStream, WebSocket, WebSocketServer } from "ws";
import {  getMousePosition, mouseDown, mouseLeft, mouseRight, mouseUp } from './control/mouse';
import { drawCircle, drawRectangle } from './control/draw';

const HTTP_PORT = 8181;
const WEBSOCKET_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const ws = new WebSocketServer({ port: WEBSOCKET_PORT });

ws.on('connection', (ws: WebSocket) => {
  console.log(`Сonnected ws on port ${WEBSOCKET_PORT}`);
  
  const duplex = createWebSocketStream(ws, {encoding: 'utf8', decodeStrings: false});

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
      case 'mouse_position': {
        const position = getMousePosition();
        duplex.write(`mouse_position ${(await position).x},${(await position).y}`);
        break
      }
      case 'draw_circle': {
        drawCircle(Number(value1));
        duplex.write(data);
        break;
      }
      case 'draw_rectangle': { 
        drawRectangle(Number(value1), Number(value2));
        duplex.write(data);
        break;
      }
      case 'draw_square': {
        drawRectangle(Number(value1), Number(value1));
        duplex.write(data);
        break;
      }
      // case 'prnt_scrn':
      //   const base64 = await getPngBuffer();
      //   duplex.write(`${data} ${base64}`);
      //   break;

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

