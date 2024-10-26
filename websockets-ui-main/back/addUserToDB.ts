import { RegisterQuery } from './types/register_query';
import users from './users_database';
import User from './classes/User'
import WebSocket from "ws";
import crypto from 'crypto';
import reg_user from './reg_user';
import { wss } from './websocketServer';
import { json } from 'stream/consumers';

export default function addUserToDB(dataObject: RegisterQuery, ws: WebSocket) {
    const id = crypto.createHash('md5').update(String(dataObject.data.name)).digest('hex');
    users.set(id, new User(String(dataObject.data.name), id, ws, String(dataObject.data.password)))
    reg_user(dataObject, ws)
}