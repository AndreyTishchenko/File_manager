import Game_User from "./Game_User";
export default class Game {
    idGame: string;
    players: Map<string, Game_User> = new Map();
    fields: Map<string, Array<Array<number>>> = new Map();
    constructor(idGame: string){
        this.idGame = idGame;
    }
}