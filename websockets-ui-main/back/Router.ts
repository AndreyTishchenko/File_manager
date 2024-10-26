import WebSocket from 'ws';
import crypto from 'crypto'
import { wss } from './websocketServer';
import reg_user from './reg_user';
import users from './users_database';
import addUserToDB from './addUserToDB'
export default function router(data: string, ws: WebSocket) {
    let dataObject = JSON.parse(data);
    let userData = JSON.parse(dataObject.data)
    switch (dataObject.type) {
        case "reg":
            const userCreds = JSON.parse(dataObject.data)
            const id = crypto.createHash('md5').update(String(userData.name)).digest('hex');
            ws.on('close', () => {
                console.log(users.get(id).ws_connection)
                users.get(id).ws_connection = null;
            })
            if (users.has(id)){
                console.log('User already exists')
                reg_user(userCreds, ws);
            }else{
                console.log('User does not exist')
                addUserToDB(userCreds, ws)
            }
            break;
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
