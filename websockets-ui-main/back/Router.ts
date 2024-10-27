import WebSocket from 'ws';
import crypto from 'crypto'
import { wss } from './websocketServer';
import reg_user from './reg_user';
import {users} from './database';
import addUserToDB from './addUserToDB'
import createRoom from './createRoom';
export default function router(data: string, ws: WebSocket) {
    let dataObject = JSON.parse(data);
    switch (dataObject.type) {
        case "reg":
            console.log('new Registration')
            let userData = JSON.parse(dataObject.data)
            const userCreds = JSON.parse(dataObject.data)
            const id = crypto.createHash('md5').update(String(userData.name)).digest('hex');
            ws.on('close', () => {
                users.get(id).ws_connection = null;
            })
            if (users.has(id)){
                console.log('router, has user in db')
                reg_user(userCreds, ws);
            }else{
                console.log('router, no such user in db')
                addUserToDB(userCreds, ws)
            }
            break;
        case "create_room":
            createRoom(ws);
            break
        case "add_user_to_room":
            console.log(dataObject.message)
            break;
        case "add_ships":
            console.log(dataObject.message)
            break;
        case "Attack":
            console.log(dataObject.message)
            break;
        case "randomAttack":
            console.log(dataObject.message)
            break;
        default:
            throw new Error("Unknown type");
    }
}
