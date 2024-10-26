import WebSocket from 'ws'
export default class User {
    name: string;
    index: string;
    ws_connection: WebSocket;
    password: string;
    active: boolean = false;
    
    constructor(name:string, index:string, ws_connection:WebSocket, password:string){
        this.name = name
        this.index = index
        this.ws_connection = ws_connection
        this.password = password
    }
}