import User_Creds from './types/User_creds';
import users from './users_database';
import WebSocket from "ws";
import crypto from 'crypto';
import { wss } from './websocketServer';
import { json } from 'stream/consumers';

export default function reg_user(dataObject: User_Creds, ws: WebSocket) {
    const id = crypto.createHash('md5').update(String(dataObject.name)).digest('hex');
    console.log(users.get(id).pswword, "==", dataObject.name)
    if(users.get(id).password == dataObject.password){
        if(users.get(id).ws_connection){
            ws.send(JSON.stringify({
                type: "reg",
                data: JSON.stringify({
                    name: dataObject.name,
                    index: id, // Use the index of the newly added user
                    error: true,
                    errorText: 'User is already logged in'
                }),
                id: 0,
            }));
        }else{
            users.get(id).ws_connection = ws;
            users.get(id).ws_connection.send(JSON.stringify({
                type: "reg",
                data: JSON.stringify({
                    name: dataObject.name,
                    index: users.size, // Use the index of the newly added user
                    error: false,
                    errorText: ''
                }),
                id: 0,
            }));

            let updateWinnersMessage = JSON.stringify({
                type: "update_winners",
                data: JSON.stringify([]),
                id: 0,
            });
            users.forEach((client) => {
                client.ws_connection.send(updateWinnersMessage)
            });

            // Sending room update in a similar way
            const roomUpdateMessage = JSON.stringify({
                type: "update_room",
                data: JSON.stringify([]),
                id: 0,
            });
            users.forEach((client) => {
                client.ws_connection.send(roomUpdateMessage);
            });
        }
    }else{
        ws.send(JSON.stringify({
            type: "reg",
            data: JSON.stringify({
                name: dataObject.name,
                index: id, // Use the index of the newly added user
                error: true,
                errorText: 'Wrong password'
            }),
            id: 0,
        }));
    }



}