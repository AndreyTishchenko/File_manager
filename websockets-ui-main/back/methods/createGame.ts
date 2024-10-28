import Game from "../classes/Game";
import crypto from 'crypto';
import {rooms, users, games} from  "../database"
export default function createGame(roomId: string) {
    const room = rooms.get(roomId);
    if (!room) {
        throw new Error(`Room with id ${roomId} not found`);
    }

    const GameUsers = room.users;
    if (!GameUsers || GameUsers.length < 2) {
        throw new Error(`Not enough users in room ${roomId}`);
    }

    const game = new Game(crypto.createHash('md5').update(String(roomId)).digest('hex'));

    for (let i = 0; i < 2; i++) {
        const user = users.get(GameUsers[i].id);
        if (!user) {
            throw new Error(`User with id ${GameUsers[i].id} not found`);
        }
        const playerKey = crypto.createHash('md5').update(String(GameUsers[i].id)).digest('hex');
        let userProperties = {...user};
        game.players.set(playerKey, {...userProperties, gameId: game.idGame, ships: []});
    }

    game.players.forEach((value, key) => {
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
        game.fields.set(key, Array.from({ length: 10 }, () => Array(10).fill(0)));
    });
    
    games.set(game.idGame, game);
    console.log(game.fields);
    
    /*
        [
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0]
        ]
    */

    return game;
}