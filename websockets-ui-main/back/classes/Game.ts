import User from "./User";
export default class Game {
    idGame: string;
    players: Map<string, User> = new Map();
    constructor(idGame: string){
        this.idGame = idGame;
    }
}