import WebSocket from 'ws';
import crypto from 'crypto'
import { wss } from './websocketServer';
import reg_user from './reg_user';
import users from './users_database';
import addUserToDB from './addUserToDB'
export default function router(data: string, ws: WebSocket) {
    let dataObject = JSON.parse(data);
    switch (dataObject.type) {
        case "reg":
            const id = crypto.createHash('md5').update(String(dataObject.data.name)).digest('hex');
            if (users.has(id)){
                console.log('User already exists')
                reg_user(dataObject, ws);
            }else{
                console.log('User does not exist')
                addUserToDB(dataObject, ws)
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
