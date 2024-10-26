import { RegisterQuery } from './types/register_query';
import users from './users_database';
import WebSocket from "ws";
import crypto from 'crypto';
import { wss } from './websocketServer';
import { json } from 'stream/consumers';

export default function reg_user(dataObject: RegisterQuery, ws: WebSocket) {
    const id = crypto.createHash('md5').update(String(dataObject.data.name)).digest('hex');
    if(users.get(id).password === dataObject.data.password){
        if(users.get(id).active === true){
            ws.send(JSON.stringify({
                type: "reg",
                data: JSON.stringify({
                    name: dataObject.data.name,
                    index: id, // Use the index of the newly added user
                    error: true,
                    errorText: 'User is already logged in'
                }),
                id: 0,
            }));
        }else{
            ws.send(JSON.stringify({
                type: "reg",
                data: JSON.stringify({
                    name: dataObject.data.name,
                    index: users.size, // Use the index of the newly added user
                    error: false,
                    errorText: ''
                }),
                id: 0,
            }));

            let updateMessage = JSON.stringify({
                type: "update_winners",
                data: JSON.stringify([]),
                id: 0,
            });
            console.log(typeof updateMessage)
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(updateMessage);
                }
            });

            // Sending room update in a similar way
            const roomUpdateMessage = JSON.stringify({
                type: "update_room",
                data: JSON.stringify([]),
                id: 0,
            });
            console.log(roomUpdateMessage)
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(roomUpdateMessage);
                }
            });
        }
    }else{
        ws.send(JSON.stringify({
            type: "reg",
            data: JSON.stringify({
                name: dataObject.data.name,
                index: id, // Use the index of the newly added user
                error: true,
                errorText: 'Wrong password'
            }),
            id: 0,
        }));
    }



}