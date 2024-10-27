import User_Creds from './types/User_creds';
import {rooms, users} from './database';
import WebSocket from "ws";
import crypto from 'crypto';
import { wss } from './websocketServer';
import { json } from 'stream/consumers';

export default function reg_user(dataObject: User_Creds, ws: WebSocket) {
    const id = crypto.createHash('md5').update(String(dataObject.name)).digest('hex');
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
            console.log('registrations was correct');
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
                if (client.ws_connection !== null) {
                    client.ws_connection.send(updateWinnersMessage)
                }
            });

            // Sending room update in a similar way
            let freeRooms = Array<{roomId: string, roomUsers: Array<{id: string, name: string}>}>();
            rooms.forEach((room) => {
                if (room.users.length < 2) {
                    freeRooms.push(({roomId: room.RoomId, roomUsers: room.users}));
                }
            });
            users.forEach((client) => {
                if (client.ws_connection !== null) {
                    console.log('connection is open for user: ', client.name);
                    console.log(client.index)
                    let freeRoomsFroThisUser = freeRooms.filter(room => !room.roomUsers.some(user => user.id === client.index));
                    console.log(freeRooms);
                    client.ws_connection.send(JSON.stringify({
                        type: "update_room",
                        data: JSON.stringify(freeRoomsFroThisUser),
                        id: 0,
                    }));
                }
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