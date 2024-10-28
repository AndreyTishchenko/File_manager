import WebSocket from "ws";
export default function StartGame(ws_connection: WebSocket, currentUserId, data: {
    type: "add_ships",
    data:
        {
            gameId: string,
            ships:Array<{position: {x: number, y: number}, direction: boolean, length: number, type: "small"|"medium"|"large"|"huge"}>
            indexPlayer: string, /* id of the player in the current game session */
        },
    id: 0,
}) {
    
}