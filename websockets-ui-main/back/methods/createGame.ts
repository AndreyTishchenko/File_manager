import Game from "../classes/Game";
import crypto from 'crypto';
import {rooms, users} from  "../database"
export default function createGame(roomId: string){
    let GameUsers = rooms.get(roomId).users;
    let game = new Game(crypto.createHash('md5').update(String(roomId)).digest('hex'));
    game.players.set(crypto.createHash('md5').update(String(GameUsers[0].id)).digest('hex'), users.get(GameUsers[0].id));
    game.players.set(crypto.createHash('md5').update(String(GameUsers[1].id)).digest('hex'), users.get(GameUsers[1].id));
    game.players.forEach( (value, key) => {
        if (value.ws_connection) {
            value.ws_connection.send(JSON.stringify({
                type: "create_game",
                data: JSON.stringify({
                    idGame: game.idGame,
                    idPlayer: key
                }),
                id: 0,
            }));
        }
    })
};