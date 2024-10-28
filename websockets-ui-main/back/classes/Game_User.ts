import User from "./User";
import WebSocket from "ws";
export default class Game_User extends User {
    gameId: string;
    ws_connection: WebSocket | null;
    ships: Array<{
        position: {x: number, y: number},
        direction: boolean,
        length: number,
        type: "small"|"medium"|"large"|"huge"
    }> = []
    constructor(name:string, index:string, password:string, gameId:string, ws_connection: WebSocket|null = null){
        super(name, index, password);
        this.gameId = gameId;
        this.ws_connection = ws_connection as WebSocket;
    }
}