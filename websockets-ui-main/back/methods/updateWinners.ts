import WebSocket from "ws";
import { winners } from "../database";
export default function updateWinners(ws_connection: WebSocket) {
    let winnersArray: {name: string, wins: number}[] = [];
    for (const [key, value] of winners) {
        winnersArray.push(value);
    }
    ws_connection.send(JSON.stringify({
        type: 'update_winners',
        data: JSON.stringify(winnersArray),
        id: 0
    }));
}